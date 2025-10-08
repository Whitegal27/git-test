import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { XIcon } from "lucide-react";
import RoleService from "../services/rolesService";
import { useToast } from "../components/ui/use-toast";

const AddRoleModal = ({ isOpen, onClose }) => {
  const [roleName, setRoleName] = useState("");
  const [permissionsList, setPermissionsList] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Fetch permissions
  useEffect(() => {
    if (isOpen) {
      RoleService.getAllPermissions()
        .then((data) => setPermissionsList(data))
        .catch((err) => {
          console.error("Failed to fetch permissions:", err);
          toast({
            title: "Fetch Error",
            description:
              err.response?.data?.message || "Failed to load permissions",
            variant: "destructive",
          });
        });
    }
  }, [isOpen]);

  // Group permissions by area
  const groupedPermissions = permissionsList.reduce((acc, perm) => {
    if (!acc[perm.areaName]) acc[perm.areaName] = [];
    acc[perm.areaName].push(perm);
    return acc;
  }, {});

  // Helper to find "View" permission in an area
  const getViewPermission = (areaName) => {
    return permissionsList.find(
      (p) =>
        p.areaName === areaName && p.name.toLowerCase().includes("view")
    );
  };

  const togglePermission = (perm) => {
    const isView = perm.name.toLowerCase().includes("view");
    if (isView) return; // prevent manual toggle of View

    setSelectedPermissions((prev) => {
      let updated = [...prev];
      const alreadySelected = prev.includes(perm.id);

      if (alreadySelected) {
        // Remove the permission
        updated = updated.filter((pid) => pid !== perm.id);

        // Check if this was the last non-view permission in the area
        const areaPerms = permissionsList.filter(
          (p) =>
            p.areaName === perm.areaName &&
            !p.name.toLowerCase().includes("view")
        );
        const stillCheckedInArea = areaPerms.some((p) =>
          updated.includes(p.id)
        );

        // If no other perms in area remain, remove the view permission
        if (!stillCheckedInArea) {
          const viewPerm = getViewPermission(perm.areaName);
          if (viewPerm) updated = updated.filter((pid) => pid !== viewPerm.id);
        }
      } else {
        // Add the permission
        updated.push(perm.id);

        // Ensure the "view" permission in this area is also checked
        const viewPerm = getViewPermission(perm.areaName);
        if (viewPerm && !updated.includes(viewPerm.id)) {
          updated.push(viewPerm.id);
        }
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roleName.trim()) {
      toast({
        title: "Validation Error",
        description: "Role name is required",
        variant: "destructive",
      });
      return;
    }

    const areaPermissions = Object.entries(groupedPermissions)
      .map(([area, perms]) => {
        const selectedForArea = perms
          .filter((p) => selectedPermissions.includes(p.id))
          .map((p) => p.id);
        return selectedForArea.length > 0
          ? { areaId: perms[0].areaId, permissionIds: selectedForArea }
          : null;
      })
      .filter(Boolean);

    if (areaPermissions.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one permission",
        variant: "destructive",
      });
      return;
    }

    const payload = { name: roleName, areaPermissions };

    try {
      setLoading(true);
      const res = await RoleService.createRole(payload);

      if (res.success) {
        toast({
          title: "Role Created",
          description:
            res.message || `${roleName} role was successfully created.`,
          variant: "default",
        });

        setRoleName("");
        setSelectedPermissions([]);
        onClose();
      } else {
        toast({
          title: "Creation Failed",
          description: res.message || "Failed to create role",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating role:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setRoleName("");
    setSelectedPermissions([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "#000000CC" }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add Role</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Provide required information to create a new role
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter role name *
            </label>
            <Input
              type="text"
              placeholder="Enter role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
            />
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Role Permissions
            </h3>

            {Object.entries(groupedPermissions).map(([area, perms]) => (
              <div key={area} className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">{area}</h4>
                <div className="grid grid-cols-2 gap-2 ml-4">
                  {perms.map((perm) => {
                    const isView = perm.name.toLowerCase().includes("view");
                    return (
                      <label key={perm.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(perm.id)}
                          onChange={() => togglePermission(perm)}
                          className="rounded border-gray-300"
                          disabled={isView} // can't toggle view manually
                        />
                        <span className="text-sm">{perm.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#007046] hover:bg-[#005a37] text-white"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Role"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoleModal;
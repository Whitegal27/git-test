import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { XIcon } from "lucide-react";
import RoleService from "../services/rolesService";

const EditRoleModal = ({ isOpen, onClose, role, fetchRoles }) => {
  const [roleName, setRoleName] = useState("");
  const [permissionsList, setPermissionsList] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load permissions + prefill role data
  useEffect(() => {
    if (isOpen && role) {
      setRoleName(role.name || "");

      // flatten role.areas -> permissions
      const currentPerms =
        role.areas?.flatMap((area) => area.permissions?.map((p) => p.id)) || [];
      setSelectedPermissions(currentPerms);

      // fetch all permissions
      RoleService.getAllPermissions().then((data) => {
        setPermissionsList(data || []);
      });
    }
  }, [isOpen, role]);

  // Group permissions by areaName
  const groupedPermissions = permissionsList.reduce((acc, perm) => {
    if (!acc[perm.areaName]) acc[perm.areaName] = [];
    acc[perm.areaName].push(perm);
    return acc;
  }, {});

  // Toggle logic similar to AddRoleModal
  const togglePermission = (perm) => {
    if (perm.name === "Check All") {
      // Select all permissions in that area
      const areaPerms = permissionsList
        .filter((p) => p.areaName === perm.areaName)
        .map((p) => p.id);

      const allSelected = areaPerms.every((id) => selectedPermissions.includes(id));

      setSelectedPermissions((prev) =>
        allSelected
          ? prev.filter((id) => !areaPerms.includes(id))
          : [...new Set([...prev, ...areaPerms])]
      );
    } else {
      setSelectedPermissions((prev) =>
        prev.includes(perm.id)
          ? prev.filter((id) => id !== perm.id)
          : [...prev, perm.id]
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build areaPermissions array
    const areaPermissions = Object.entries(groupedPermissions)
      .map(([area, perms]) => {
        const selectedForArea = perms
          .filter((p) => selectedPermissions.includes(p.id))
          .map((p) => p.id);

        return {
          areaId: perms[0].areaId,
          permissionIds: selectedForArea,
        };
      })
      .filter((ap) => ap.permissionIds.length > 0);

    const payload = {
      name: roleName,
      areaPermissions,
    };

    try {
      setLoading(true);
      await RoleService.editRoleForUser(role.id, payload);
      await fetchRoles(); // refresh roles list
      onClose();
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setRoleName("");
    setSelectedPermissions([]);
    onClose();
  };

  if (!isOpen || !role) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "#000000CC" }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit Role</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Update role details and permissions
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
                  {perms.map((perm) => (
                    <label key={perm.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm.id)}
                        onChange={() => togglePermission(perm)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{perm.name}</span>
                    </label>
                  ))}
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
              {loading ? "Updating..." : "Update Role"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoleModal;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import AddRoleModal from "../../components/AddRoleModal";
import EditRoleModal from "../../components/EditRoleModal";
import RoleService from "../../services/rolesService";

const RoleManagementPage = () => {
  const navigate = useNavigate();
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoles = async () => {
    try {
      const res = await RoleService.getRoleWithDetails();
      setRoles(res || []); // API already returns an array of roles
    } catch (err) {
      console.error("Failed to fetch roles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleViewUsers = (role) => {
    navigate(`/user-management/roles-details?roleId=${role.id}&roleName=${encodeURIComponent(role.name)}`);
  };
  const handleEditRoles = (role) => {
    setSelectedRole(role);
    setShowEditRoleModal(true);
  };

  if (loading) return <p className="p-6">Loading roles...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2E3A52] mb-2">
            Role Management
          </h1>
          <p className="text-gray-600">
            Here's a list of all Roles on the system
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/user-management")}
            className="p-2 hover:bg-gray-100 rounded-lg flex gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back</span>
          </button>
          <Button
            onClick={() => setShowAddRoleModal(true)}
            className="bg-[#007046] hover:bg-[#005a37] text-white px-4 py-2 flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Add New Role
          </Button>
        </div>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {roles.map((role) => (
          <Card key={role.id} className="h-full flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                {role.name}
              </CardTitle>
              <p className="text-sm text-gray-500">
                Total users with this role: {role.userCount || 0}
              </p>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col justify-between">
              {/* Areas + Permissions */}
              <div className="space-y-3">
                {role.areas?.length > 0 ? (
                  role.areas.map((area) => (
                    <div key={area.id}>
                      <h4 className="font-semibold text-gray-800 capitalize mb-2">
                        {area.name}
                      </h4>
                      <div className="space-y-1 ml-4">
                        {area.permissions?.map((perm) => (
                          <div
                            key={perm.id}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                            <span>
                              Can {perm.name} {area.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm italic">
                    No permissions assigned
                  </p>
                )}
              </div>

              {/* Buttons pinned at bottom */}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditRoles(role)}
                  className="px-7 py-1 text-xs"
                >
                  Edit Roles
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleViewUsers(role)}
                  className="px-7 py-1 text-xs bg-[#007046] hover:bg-[#005a37] text-white"
                >
                  View Users
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Role Modal */}
      <AddRoleModal
        isOpen={showAddRoleModal}
        onClose={() => setShowAddRoleModal(false)}
      />

      {/* Edit Role Modal */}
      <EditRoleModal
        isOpen={showEditRoleModal}
        onClose={() => setShowEditRoleModal(false)}
        role={selectedRole}
        fetchRoles={fetchRoles}
      />
    </div>
  );
};

export default RoleManagementPage;

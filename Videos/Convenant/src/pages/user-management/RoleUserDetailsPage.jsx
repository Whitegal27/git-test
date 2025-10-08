// src/pages/user-management/RoleUserDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { SearchIcon, MoreVerticalIcon, ArrowLeft } from "lucide-react";
import AddUserModal from "../../components/AddUserModal";
import DeactivateUserModal from "../../components/DeactivateUserModal";
import ActivateUserModal from "../../components/ActivateUserModal";
import RoleService from "../../services/rolesService";
import AuthService from "../../services/authService";

const RoleUserDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const roleId = params.get("roleId");
  const roleName = params.get("roleName");

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [userToDeactivate, setUserToDeactivate] = useState(null);
  const [userToActivate, setUserToActivate] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [users, setUsers] = useState([]); // only users for this role
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch users for this role only
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesRes = await RoleService.getRoleWithDetails();
        const role = rolesRes.find((r) => r.id === roleId);
        if (role) {
          setUsers(role.users || []);
        } else {
          setUsers([]);
        }

        const meRes = await AuthService.getUserInfo();
        setCurrentUser(meRes.data);
      } catch (err) {
        console.error("Failed to fetch role users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [roleId]);

  // Flatten current user permissions
  const getUserPermissions = (user) => {
    if (!user?.roles) return [];
    return user.roles.flatMap((role) =>
      role.areas.flatMap((area) =>
        area.permissions.map((p) => `${area.name}:${p.name}`)
      )
    );
  };

  const permissions = getUserPermissions(currentUser);
  const canEditUser = permissions.includes("User Management:Edit");

  // ✅ Search & filter (applies only to role’s users now)
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()); // added username
    const matchesLocation =
      locationFilter === "all" ||
      user.branches?.some((b) => b.name === locationFilter);
    return matchesSearch && matchesLocation;
  });

  // Selection
  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length
        ? []
        : filteredUsers.map((user) => user.id)
    );
  };

  // Add user
  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
    setShowAddModal(false);
  };

  // Deactivate
  const handleDeactivateUser = (user) => {
    setUserToDeactivate(user);
    setShowDeactivateModal(true);
    setShowDropdown(null);
  };

  const handleUserDeactivated = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: false } : u))
    );
  };

  // Activate
  const handleActivateUser = (user) => {
    setUserToActivate(user);
    setShowActivateModal(true);
    setShowDropdown(null);
  };

  const handleUserActivated = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: true } : u))
    );
  };

  // Badge
  const getStatusBadge = (isActive) =>
    isActive ? (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
        Active
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
        Inactive
      </Badge>
    );

  return (
    <div className="p-6 space-y-6">
      {/* Back button + Header in same row */}
      <div className="flex items-center justify-between">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-[#2E3A52] mb-2">
            Users with Role: {roleName}
          </h1>
          <p className="text-gray-600">
            Here’s a list of all users assigned to this role
          </p>
        </div>
        <button
          onClick={() => navigate("/user-management/roles")}
          className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* User Table */}
      <Card className="rounded-none">
        {/* Filters */}
        <div className="flex items-center gap-4 ml-4">
          <div className="relative flex-1 max-w-md bg-[#F3F4F6] border-[1px] border-[#E5E7EB] hover:border-gray-300 py-2 px-3 rounded-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search with user name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-transparent border-0 focus:ring-0 focus:outline-none text-sm"
            />
          </div>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-48 ">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {[
                ...new Set(
                  users.flatMap((u) => u.branches?.map((b) => b.name) || [])
                ),
              ].map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      checked={
                        selectedUsers.length === filteredUsers.length &&
                        filteredUsers.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">
                    User ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">
                    Full Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">
                    Email Address
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.id}</td>
                      <td className="py-3 px-4">
                        {user.fullName || user.username}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        {getStatusBadge(user.isActive)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setShowDropdown(
                                showDropdown === user.id ? null : user.id
                              )
                            }
                            className="p-1"
                          >
                            <MoreVerticalIcon className="w-4 h-4" />
                          </Button>

                          {showDropdown === user.id && (
                            <div className="absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                              {canEditUser && (
                                <button
                                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                  onClick={() => {
                                    // Handle edit
                                    setShowDropdown(null);
                                  }}
                                >
                                  Edit
                                </button>
                              )}

                              {user.isActive && (
                                <button
                                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                  onClick={() => handleDeactivateUser(user)}
                                >
                                  Deactivate
                                </button>
                              )}
                              {!user.isActive && (
                                <button
                                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                  onClick={() => handleActivateUser(user)}
                                >
                                  Activate
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onUserCreated={handleUserCreated}
      />

      <DeactivateUserModal
        isOpen={showDeactivateModal}
        onClose={() => {
          setShowDeactivateModal(false);
          setUserToDeactivate(null);
        }}
        user={userToDeactivate}
        onUserDeactivated={handleUserDeactivated}
      />

      <ActivateUserModal
        isOpen={showActivateModal}
        onClose={() => {
          setShowActivateModal(false);
          setUserToActivate(null);
        }}
        user={userToActivate}
        onUserActivated={handleUserActivated}
      />
    </div>
  );
};

export default RoleUserDetailsPage;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../../components/ui/card";
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../components/ui/select";
// import { Badge } from "../../components/ui/badge";
// import { SearchIcon, MoreVerticalIcon, PlusIcon } from "lucide-react";
// import AddUserModal from "../../components/AddUserModal";
// import DeactivateUserModal from "../../components/DeactivateUserModal";
// import ActivateUserModal from "../../components/ActivateUserModal";
// import UserService from "../../services/userService";
// import AuthService from "../../services/authService";

// const UserManagementPage = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("all");
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeactivateModal, setShowDeactivateModal] = useState(false);
//   const [showActivateModal, setShowActivateModal] = useState(false);
//   const [userToDeactivate, setUserToDeactivate] = useState(null);
//   const [userToActivate, setUserToActivate] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);

//   // ✅ Fetch users & logged-in user
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const usersRes = await UserService.getUsers();
//         setUsers(usersRes.data || []);

//         const meRes = await AuthService.getUserInfo();
//         console.log("Logged-in User Info:", meRes.data);
//         setCurrentUser(meRes.data);
//       } catch (err) {
//         console.error("Failed to fetch users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // ✅ Flatten current user permissions
//   const getUserPermissions = (user) => {
//     console.log("Current User Object:", user);
//     if (!user?.roles) return [];
//     return user.roles.flatMap((role) =>
//       role.areas.flatMap((area) =>
//         area.permissions.map((p) => `${area.name}:${p.name}`)
//       )
//     );
//   };

//   const permissions = getUserPermissions(currentUser);
//   console.log("Current User Permissions:", permissions);

//   const canCreateUser = permissions.includes("User Management:Create");
//   const canEditUser = permissions.includes("User Management:Edit");
//   // const canDeactivateUser = permissions.includes("User Management:Deactivate");
//   // const canActivateUser = permissions.includes("User Management:Activate");

//   // ✅ Search & filter
//   const filteredUsers = users.filter((user) => {
//     const matchesSearch =
//       user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesLocation =
//       locationFilter === "all" ||
//       user.branches?.some((b) => b.name === locationFilter);
//     return matchesSearch && matchesLocation;
//   });

//   // ✅ Selection
//   const handleSelectUser = (userId) => {
//     setSelectedUsers((prev) =>
//       prev.includes(userId)
//         ? prev.filter((id) => id !== userId)
//         : [...prev, userId]
//     );
//   };

//   const handleSelectAll = () => {
//     setSelectedUsers(
//       selectedUsers.length === filteredUsers.length
//         ? []
//         : filteredUsers.map((user) => user.id)
//     );
//   };

//   // ✅ Add user
//   const handleUserCreated = (newUser) => {
//     setUsers((prevUsers) => [newUser, ...prevUsers]);
//     setShowAddModal(false);
//   };

//   // ✅ Deactivate
//   const handleDeactivateUser = (user) => {
//     setUserToDeactivate(user);
//     setShowDeactivateModal(true);
//     setShowDropdown(null);
//   };

//   const handleUserDeactivated = (id) => {
//     setUsers((prev) =>
//       prev.map((u) => (u.id === id ? { ...u, isActive: false } : u))
//     );
//   };

//   // ✅ Activate
//   const handleActivateUser = (user) => {
//     setUserToActivate(user);
//     setShowActivateModal(true);
//     setShowDropdown(null);
//   };

//   const handleUserActivated = (id) => {
//     setUsers((prev) =>
//       prev.map((u) => (u.id === id ? { ...u, isActive: true } : u))
//     );
//   };

//   // ✅ Badge
//   const getStatusBadge = (isActive) =>
//     isActive ? (
//       <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
//         Active
//       </Badge>
//     ) : (
//       <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
//         Inactive
//       </Badge>
//     );

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-[#2E3A52] mb-2">
//             User Management
//           </h1>
//           <p className="text-gray-600">
//             Here's a list of all users on the system
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Button
//             variant="outline"
//             onClick={() => navigate("/user-management/roles")}
//             className="px-4 py-2"
//           >
//             Manage Roles
//           </Button>

//           {/* ✅ Only show if allowed */}
//           {canCreateUser && (
//             <Button
//               onClick={() => setShowAddModal(true)}
//               className="bg-[#007046] hover:bg-[#005a37] text-white px-4 py-2 flex items-center gap-2"
//             >
//               <PlusIcon className="w-4 h-4" />
//               Add New User
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* User Table */}
//       <Card className="rounded-none">
//         {/* Filters */}
//         <div className="flex items-center gap-4 ml-4">
//           <div className="relative flex-1 max-w-md bg-[#F3F4F6] border-[1px] border-[#E5E7EB] hover:border-gray-300 py-2 px-3">
//             <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <Input
//               placeholder="Search with user name"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 border-0 outline-none"
//             />
//           </div>
//           <Select value={locationFilter} onValueChange={setLocationFilter}>
//             <SelectTrigger className="w-48 ">
//               <SelectValue placeholder="Location" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Locations</SelectItem>
//               {[
//                 ...new Set(
//                   users.flatMap((u) => u.branches?.map((b) => b.name) || [])
//                 ),
//               ].map((loc) => (
//                 <SelectItem key={loc} value={loc}>
//                   {loc}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <CardContent className="p-0">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200 bg-gray-50">
//                   <th className="text-left py-3 px-4">
//                     <input
//                       type="checkbox"
//                       checked={
//                         selectedUsers.length === filteredUsers.length &&
//                         filteredUsers.length > 0
//                       }
//                       onChange={handleSelectAll}
//                       className="rounded border-gray-300"
//                     />
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-600">
//                     User ID
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-600">
//                     Full Name
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-600">
//                     Email Address
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-600">
//                     Role
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-600">
//                     Location
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-600">
//                     Status
//                   </th>
//                   <th className="text-left py-3 px-4 font-semibold text-gray-600"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan={8} className="text-center py-6">
//                       Loading users...
//                     </td>
//                   </tr>
//                 ) : filteredUsers.length > 0 ? (
//                   filteredUsers.map((user) => (
//                     <tr
//                       key={user.id}
//                       className="border-b border-gray-100 hover:bg-gray-50"
//                     >
//                       <td className="py-3 px-4">
//                         <input
//                           type="checkbox"
//                           checked={selectedUsers.includes(user.id)}
//                           onChange={() => handleSelectUser(user.id)}
//                           className="rounded border-gray-300"
//                         />
//                       </td>
//                       <td className="py-3 px-4 text-gray-600">{user.id}</td>
//                       <td className="py-3 px-4">
//                         {user.fullName || user.username}
//                       </td>
//                       <td className="py-3 px-4 text-gray-600">{user.email}</td>
//                       <td className="py-3 px-4">
//                         {user.roles?.length > 0 ? (
//                           <Badge className="bg-blue-100 text-blue-700">
//                             {user.roles[0].name}
//                           </Badge>
//                         ) : (
//                           <Badge className="bg-gray-100 text-gray-700">
//                             No Role
//                           </Badge>
//                         )}
//                       </td>
//                       <td className="py-3 px-4 text-gray-600">
//                         {user.branches?.length > 0
//                           ? user.branches.map((b) => b.location).join(", ")
//                           : "—"}
//                       </td>
//                       <td className="py-3 px-4">
//                         {getStatusBadge(user.isActive)}
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="relative">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() =>
//                               setShowDropdown(
//                                 showDropdown === user.id ? null : user.id
//                               )
//                             }
//                             className="p-1"
//                           >
//                             <MoreVerticalIcon className="w-4 h-4" />
//                           </Button>

//                           {showDropdown === user.id && (
//                             <div className="absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
//                               {/* ✅ Edit only if allowed */}
//                               {canEditUser && (
//                                 <button
//                                   className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
//                                   onClick={() => {
//                                     // Handle edit
//                                     setShowDropdown(null);
//                                   }}
//                                 >
//                                   Edit
//                                 </button>
//                               )}

//                               {/* ✅ Deactivate if allowed */}

//                               {user.isActive && (
//                                 <button
//                                   className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
//                                   onClick={() => handleDeactivateUser(user)}
//                                 >
//                                   Deactivate
//                                 </button>
//                               )}
//                               {/* ✅ Activate if allowed */}
//                               {!user.isActive && (
//                                 <button
//                                   className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
//                                   onClick={() => handleActivateUser(user)}
//                                 >
//                                   Activate
//                                 </button>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={8} className="text-center py-6">
//                       No users found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Modals */}
//       <AddUserModal
//         isOpen={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onUserCreated={handleUserCreated}
//       />

//       <DeactivateUserModal
//         isOpen={showDeactivateModal}
//         onClose={() => {
//           setShowDeactivateModal(false);
//           setUserToDeactivate(null);
//         }}
//         user={userToDeactivate}
//         onUserDeactivated={handleUserDeactivated}
//       />

//       <ActivateUserModal
//         isOpen={showActivateModal}
//         onClose={() => {
//           setShowActivateModal(false);
//           setUserToActivate(null);
//         }}
//         user={userToActivate}
//         onUserActivated={handleUserActivated}
//       />
//     </div>
//   );
// };

// export default UserManagementPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
} from "../../components/ui/card";
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
import { SearchIcon, MoreVerticalIcon, PlusIcon } from "lucide-react";
import AddUserModal from "../../components/AddUserModal";
import EditUserModal from "../../components/EditUserModal";
import DeactivateUserModal from "../../components/DeactivateUserModal";
import ActivateUserModal from "../../components/ActivateUserModal";
import UserService from "../../services/userService";
import AuthService from "../../services/authService";

const UserManagementPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDeactivate, setUserToDeactivate] = useState(null);
  const [userToActivate, setUserToActivate] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch users & logged-in user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await UserService.getUsers();
        console.log("Fetched Users:", usersRes.data);
        setUsers(usersRes.data || []);

        const meRes = await AuthService.getUserInfo();
        setCurrentUser(meRes.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const canCreateUser = permissions.includes("User Management:Create");
  const canEditUser = permissions.includes("User Management:Edit");

  // Search & filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
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

  // Edit user
  const handleEditUser = (user) => {
    console.log("Editing user:", user);
    setUserToEdit(user);
    setShowEditModal(true);
    setShowDropdown(null);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  // Deactivate user
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

  // Activate user
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

  // Status badge
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2E3A52] mb-2">
            User Management
          </h1>
          <p className="text-gray-600">
            Here's a list of all users on the system
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/user-management/roles")}
            className="px-4 py-2"
          >
            Manage Roles
          </Button>

          {canCreateUser && (
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-[#007046] hover:bg-[#005a37] text-white px-4 py-2 flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              Add New User
            </Button>
          )}
        </div>
      </div>

      {/* User Table */}
      <Card className="rounded-none">
        {/* Filters */}
        <div className="flex items-center gap-4 ml-4">
          <div className="relative flex-1 max-w-md bg-[#F3F4F6] border-[1px] border-[#E5E7EB] hover:border-gray-300 py-2 px-3">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search with user name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-0 outline-none"
            />
          </div>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {[...new Set(users.flatMap((u) => u.branches?.map((b) => b.name) || []))].map(
                (loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                )
              )}
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
                    Role
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">
                    Location
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
                    <td colSpan={8} className="text-center py-6">
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="py-3 px-4 text-gray-600">{user.id}</td>
                      <td className="py-3 px-4">{user.fullName || user.username}</td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        {user.roles?.length > 0 ? (
                          <Badge className="bg-blue-100 text-blue-700">
                            {user.roles[0].name}
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-700">No Role</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {user.branches?.length > 0
                          ? user.branches.map((b) => b.location).join(", ")
                          : "—"}
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(user.isActive)}</td>
                      <td className="py-3 px-4">
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setShowDropdown(showDropdown === user.id ? null : user.id)
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
                                  onClick={() => handleEditUser(user)}
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
                    <td colSpan={8} className="text-center py-6">
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

      <EditUserModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setUserToEdit(null);
        }}
        user={userToEdit}
        onUserUpdated={handleUserUpdated}
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

export default UserManagementPage;


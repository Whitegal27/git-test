// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../../components/ui/card";
// import { Input } from "../../components/ui/input";
// import { Badge } from "../../components/ui/badge";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationPrevious,
//   PaginationNext,
// } from "../../components/ui/pagination";
// import { SearchIcon, ChevronDownIcon } from "lucide-react";
// import UserService from "../../services/userService";
// import AuditService from "../../services/auditService";
// import AuthService from "../../services/authService";

// const AuditTrailPage = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [expandedActivities, setExpandedActivities] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);

//   const [activities, setActivities] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);

//   // --- Fetch Users + Current User ---
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const meRes = await AuthService.getUserInfo();
//         setCurrentUser(meRes.data);
//         const data = await UserService.getUsers();
//         setUsers(data.data || []);
//       } catch (error) {
//         console.error("Failed to fetch users", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // --- Fetch Audit Logs ---
//   useEffect(() => {
//     const fetchAudit = async () => {
//       if (!selectedUser) return;
//       try {
//         setLoading(true);
//         // const data = await AuditService.getAudit({
//         //   page: currentPage,
//         //   pageSize: rowsPerPage,
//         //   userId: selectedUser.id,
//         // });

//         const data = await AuditService.getAudit({
//           userId: selectedUser?.id || "",   // string
//           page: currentPage,                // int
//           pageSize: rowsPerPage,            // int
//           startDate: null,   // string ($date-time)
//           endDate: null,        // string ($date-time)
//           includeIncompleteSessions: true,  // boolean
//         });

//         setActivities(data.items || data || []);
//         setTotalPages(
//           Math.ceil((data.totalCount || (data?.length ?? 0)) / rowsPerPage)
//         );
//       } catch (error) {
//         console.error("Failed to fetch audit logs", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAudit();
//   }, [selectedUser, currentPage, rowsPerPage]);

//   // --- Helpers ---
//   const filteredUsers = users.filter((user) =>
//     (user.fullName || user.username || "")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   const toggleActivityExpansion = (activityIndex) => {
//     setExpandedActivities((prev) => ({
//       ...prev,
//       [activityIndex]: !prev[activityIndex],
//     }));
//   };

//   const selectUser = (user) => {
//     setSelectedUser(user);
//     setCurrentPage(1);
//     setExpandedActivities({});
//   };

//   const formatTime = (timestamp) => {
//     if (!timestamp) return "N/A";
//     return new Date(timestamp).toLocaleString("en-GB", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getUserPermissions = (user) => {
//     if (!user?.roles) return [];
//     return user.roles.flatMap((role) =>
//       role.areas.flatMap((area) =>
//         area.permissions.map((p) => `${area.name}:${p.name}`)
//       )
//     );
//   };

//   const permissions = useMemo(
//     () => getUserPermissions(currentUser),
//     [currentUser]
//   );

//   const hasPermission = (area, action) => {
//     return permissions.includes(`${area}:${action}`);
//   };

//   const getActivityIcon = (activity) => {
//     const value = activity ? activity.toLowerCase() : "";
//     if (value.includes("login")) {
//       return <div className="w-2 h-2 rounded-full bg-blue-500"></div>;
//     } else if (value.includes("sign out") || value.includes("logout")) {
//       return <div className="w-2 h-2 rounded-full bg-red-500"></div>;
//     }
//     return <div className="w-2 h-2 rounded-full bg-gray-400"></div>;
//   };

//   const getRoleName = (roles) => {
//     if (!roles || roles.length === 0) return "No Role";
//     return roles[0]?.name || "No Role";
//   };

//   const getRoleColor = (roleName) => {
//     if (roleName === "Admin") return "bg-[#007046] text-white";
//     return "bg-gray-100 text-gray-700";
//   };

//   // --- Render ---
//   if (loading && !users.length) {
//     return (
//       <div className="p-6">
//         <p className="text-gray-500">Loading users...</p>
//       </div>
//     );
//   }

//   // 🚨 Permission check here
//   if (!hasPermission("Audit Rail", "View")) {
//     return (
//       <div className="p-6">
//         <h1 className="text-2xl font-bold text-[#2E3A52] mb-2">
//           Access Denied
//         </h1>
//         <p className="text-gray-600">
//           You do not have permission to view the audit trail.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-[#2E3A52] mb-2">Audit Trail</h1>
//         <p className="text-gray-600">Track all logged activities here</p>
//       </div>

//       <div className="bg-white border border-gray-100 rounded-md shadow-sm px-6 py-6">
//         {/* Search */}
//         <div className="relative max-w-md bg-[#F3F4F6] border-[1px] border-[#E5E7EB] hover:border-gray-300 py-2 px-3 mb-8">
//           <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             placeholder="Search with user name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 border-0 outline-none"
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Users List */}
//           <div className="lg:col-span-1">
//             <Card className="border-gray-100 bg-gray-50 rounded-none">
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold">Users</CardTitle>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <div className="space-y-1">
//                   {filteredUsers.map((user) => {
//                     const roleName = getRoleName(user.roles);
//                     return (
//                       <div
//                         key={user.id}
//                         className="border-b border-gray-100 last:border-b-0"
//                       >
//                         <div
//                           className={`flex items-center p-4 cursor-pointer ${
//                             selectedUser?.id === user.id
//                               ? "bg-[#0B3948] text-white"
//                               : ""
//                           }`}
//                           onClick={() => selectUser(user)}
//                         >
//                           <div className="flex justify-between w-full">
//                             <div className="font-medium">
//                               {user.fullName || user.username}
//                             </div>
//                             <Badge
//                               className={`mt-1 text-xs py-[5px] px-4 ${
//                                 selectedUser?.id === user.id
//                                   ? "bg-white text-[#007046]"
//                                   : getRoleColor(roleName)
//                               }`}
//                             >
//                               {roleName}
//                             </Badge>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Activity Details */}
//           <div className="lg:col-span-2">
//             {selectedUser ? (
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between">
//                   <div>
//                     <CardTitle className="text-lg font-semibold">
//                       {selectedUser.fullName || selectedUser.username} - Activity
//                       Log
//                     </CardTitle>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Badge
//                         className={getRoleColor(getRoleName(selectedUser.roles))}
//                       >
//                         {getRoleName(selectedUser.roles)}
//                       </Badge>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   {/* Activities */}
//                   {activities.length === 0 ? (
//                     <p className="text-gray-500">
//                       No activities available for this user
//                     </p>
//                   ) : (
//                     <div className="space-y-2">
//                       {activities.map((activity, index) => {
//                         const actualIndex =
//                           (currentPage - 1) * rowsPerPage + index;
//                         const isExpanded = expandedActivities[actualIndex];

//                         return (
//                           <div key={index}>
//                             <div className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden">
//                               <div
//                                 className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
//                                 onClick={() =>
//                                   toggleActivityExpansion(actualIndex)
//                                 }
//                               >
//                                 <div>
//                                   <div className="font-medium text-gray-900">
//                                     {activity?.action || "N/A"}
//                                   </div>
//                                   <div className="text-sm text-gray-500">
//                                     {formatTime(activity?.timestamp)}
//                                   </div>
//                                 </div>
//                                 <ChevronDownIcon
//                                   className={`w-5 h-5 text-gray-400 transition-transform ${
//                                     isExpanded ? "rotate-180" : ""
//                                   }`}
//                                 />
//                               </div>

//                               {isExpanded && (
//                                 <div className="border-t border-gray-100 bg-gray-50">
//                                   <div className="overflow-x-auto">
//                                     <table className="w-full">
//                                       <thead>
//                                         <tr className="border-b border-gray-100">
//                                           <th className="text-left py-3 px-4 font-semibold text-gray-600">
//                                             Activity
//                                           </th>
//                                           <th className="text-left py-3 px-4 font-semibold text-gray-600">
//                                             Description
//                                           </th>
//                                           <th className="text-left py-3 px-4 font-semibold text-gray-600">
//                                             Time Logged
//                                           </th>
//                                         </tr>
//                                       </thead>
//                                       <tbody>
//                                         {activities.map(
//                                           (sessionActivity, sessionIndex) => (
//                                             <tr
//                                               key={sessionIndex}
//                                               className="border-b border-gray-100 hover:bg-white"
//                                             >
//                                               <td className="py-3 px-4">
//                                                 <div className="flex items-center gap-3">
//                                                   {getActivityIcon(
//                                                     sessionActivity?.action
//                                                   )}
//                                                   <span className="font-medium">
//                                                     {sessionActivity?.action ||
//                                                       "N/A"}
//                                                   </span>
//                                                 </div>
//                                               </td>
//                                               <td className="py-3 px-4 text-gray-600">
//                                                 {sessionActivity?.description ||
//                                                   "N/A"}
//                                               </td>
//                                               <td className="py-3 px-4 text-gray-600">
//                                                 {formatTime(
//                                                   sessionActivity?.timestamp
//                                                 )}
//                                               </td>
//                                             </tr>
//                                           )
//                                         )}
//                                       </tbody>
//                                     </table>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}

//                   {/* Pagination */}
//                   {totalPages > 1 && (
//                     <Pagination className="mt-6">
//                       <PaginationContent>
//                         <PaginationItem>
//                           <PaginationPrevious
//                             onClick={() =>
//                               setCurrentPage((prev) => Math.max(prev - 1, 1))
//                             }
//                           />
//                         </PaginationItem>

//                         {[...Array(totalPages)].map((_, i) => (
//                           <PaginationItem key={i}>
//                             <PaginationLink
//                               isActive={currentPage === i + 1}
//                               onClick={() => setCurrentPage(i + 1)}
//                             >
//                               {i + 1}
//                             </PaginationLink>
//                           </PaginationItem>
//                         ))}

//                         <PaginationItem>
//                           <PaginationNext
//                             onClick={() =>
//                               setCurrentPage((prev) =>
//                                 Math.min(prev + 1, totalPages)
//                               )
//                             }
//                           />
//                         </PaginationItem>
//                       </PaginationContent>
//                     </Pagination>
//                   )}
//                 </CardContent>
//               </Card>
//             ) : (
//               <Card>
//                 <CardContent className="py-12 text-center">
//                   <p className="text-gray-500">
//                     Select a user to view their audit trail
//                   </p>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuditTrailPage;



import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../../components/ui/pagination";
import { SearchIcon, ChevronDownIcon } from "lucide-react";
import UserService from "../../services/userService";
import AuditService from "../../services/auditService";
import AuthService from "../../services/authService";

const AuditTrailPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [expandedSessions, setExpandedSessions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const [sessions, setSessions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // --- Fetch Users + Current User ---
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const meRes = await AuthService.getUserInfo();
        setCurrentUser(meRes.data);
        const data = await UserService.getUsers();
        setUsers(data.data || []);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // --- Fetch Audit Logs ---
  useEffect(() => {
    const fetchAudit = async () => {
      if (!selectedUser) return;
      try {
        setLoading(true);
        const data = await AuditService.getAudit({
          userId: selectedUser?.id || "",
          page: currentPage,
          pageSize: rowsPerPage,
          startDate: null,
          endDate: null,
          includeIncompleteSessions: true,
        });

        // ✅ Expect sessions array instead of flat activities
        const apiSessions = data.data || data.items || [];
        setSessions(Array.isArray(apiSessions) ? apiSessions : []);
        setTotalPages(
          Math.ceil((data.totalCount || apiSessions.length) / rowsPerPage)
        );
      } catch (error) {
        console.error("Failed to fetch audit logs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAudit();
  }, [selectedUser, currentPage, rowsPerPage]);

  // --- Helpers ---
  const filteredUsers = users.filter((user) =>
    (user.fullName || user.username || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const toggleSessionExpansion = (sessionId) => {
    setExpandedSessions((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId],
    }));
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setCurrentPage(1);
    setExpandedSessions({});
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUserPermissions = (user) => {
    if (!user?.roles) return [];
    return user.roles.flatMap((role) =>
      role.areas.flatMap((area) =>
        area.permissions.map((p) => `${area.name}:${p.name}`)
      )
    );
  };

  const permissions = useMemo(
    () => getUserPermissions(currentUser),
    [currentUser]
  );

  const hasPermission = (area, action) => {
    return permissions.includes(`${area}:${action}`);
  };

  const getRoleName = (roles) => {
    if (!roles || roles.length === 0) return "No Role";
    return roles[0]?.name || "No Role";
  };

  const getRoleColor = (roleName) => {
    if (roleName === "Admin") return "bg-[#007046] text-white";
    return "bg-gray-100 text-gray-700";
  };

  // --- Render ---
  if (loading && !users.length) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  if (!hasPermission("Audit Rail", "View")) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#2E3A52] mb-2">Access Denied</h1>
        <p className="text-gray-600">
          You do not have permission to view the audit trail.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#2E3A52] mb-2">Audit Trail</h1>
        <p className="text-gray-600">Track all logged sessions and activities here</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-md shadow-sm px-6 py-6">
        {/* Search */}
        <div className="relative max-w-md bg-[#F3F4F6] border-[1px] border-[#E5E7EB] hover:border-gray-300 py-2 px-3 mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search with user name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-0 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users List */}
          <div className="lg:col-span-1">
            <Card className="border-gray-100 bg-gray-50 rounded-none">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Users</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {filteredUsers.map((user) => {
                    const roleName = getRoleName(user.roles);
                    return (
                      <div
                        key={user.id}
                        className="border-b border-gray-100 last:border-b-0"
                      >
                        <div
                          className={`flex items-center p-4 cursor-pointer ${
                            selectedUser?.id === user.id
                              ? "bg-[#0B3948] text-white"
                              : ""
                          }`}
                          onClick={() => selectUser(user)}
                        >
                          <div className="flex justify-between w-full">
                            <div className="font-medium">
                              {user.fullName || user.username}
                            </div>
                            <Badge
                              className={`mt-1 text-xs py-[5px] px-4 ${
                                selectedUser?.id === user.id
                                  ? "bg-white text-[#007046]"
                                  : getRoleColor(roleName)
                              }`}
                            >
                              {roleName}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sessions & Activities */}
          <div className="lg:col-span-2">
            {selectedUser ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {selectedUser.fullName || selectedUser.username} - Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {sessions.length === 0 ? (
                    <p className="text-gray-500">
                      No sessions available for this user
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {sessions.map((session) => {
                        const isExpanded = expandedSessions[session.sessionId];
                        return (
                          <div
                            key={session.sessionId}
                            className="border rounded-md shadow-sm"
                          >
                            {/* Session Row */}
                            <div
                              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                              onClick={() =>
                                toggleSessionExpansion(session.sessionId)
                              }
                            >
                              <div>
                                <div className="font-medium text-gray-900">
                                  Session {session.sessionId}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {formatTime(session.sessionStart)} →{" "}
                                  {formatTime(session.sessionEnd)}
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span
                                  className={`px-3 py-1 text-xs rounded-full ${
                                    session.isComplete
                                      ? "bg-green-100 text-green-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {session.isComplete ? "Complete" : "Ongoing"}
                                </span>
                                <ChevronDownIcon
                                  className={`w-5 h-5 text-gray-400 transition-transform ${
                                    isExpanded ? "rotate-180" : ""
                                  }`}
                                />
                              </div>
                            </div>

                            {/* Activities */}
                            {isExpanded && (
                              <div className="bg-gray-50 border-t">
                                <table className="w-full text-sm">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th className="text-left py-2 px-4">Activity</th>
                                      <th className="text-left py-2 px-4">Description</th>
                                      <th className="text-left py-2 px-4">Time</th>
                                      <th className="text-left py-2 px-4">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {session.activities?.map((a, i) => (
                                      <tr key={i} className="border-t hover:bg-white">
                                        <td className="py-2 px-4">{a.action}</td>
                                        <td className="py-2 px-4">{a.description}</td>
                                        <td className="py-2 px-4">{formatTime(a.timestamp)}</td>
                                        <td className="py-2 px-4">{a.status}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-500">
                    Select a user to view their audit sessions
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrailPage;


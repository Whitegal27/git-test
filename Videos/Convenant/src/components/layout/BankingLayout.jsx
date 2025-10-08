
// import ComplianceIcon from "../../assets/icons/ComplianceIcon.png"
// import ReportIcon from "../../assets/icons/reportIcon.png"
// import AuditIcon from "../../assets/icons/auditIcon.png"

// import React from "react";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import AuthService from "../../services/authService.js";
// // import { useSidebar } from "@/contexts/SidebarContext";
// import {
//   Sidebar,
//   SidebarHeader,
//   SidebarContent,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarInset,
//   SidebarTrigger,
//   SidebarProvider
// } from "@/components/ui/sidebar";
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import { LayoutDashboard, Users, Building2, ChevronRight, UserCog, Settings, Bell } from "lucide-react";


// export function BankingLayout() {
//   return (
//     <SidebarProvider>
//       <BankingLayoutContent />
//     </SidebarProvider>
//   );
// }

// function BankingLayoutContent() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [accordionValue, setAccordionValue] = React.useState("");

//   // Pull user from localStorage
//   const storedUser = JSON.parse(localStorage.getItem("loginResponse")) || {};
//   const username = storedUser.username || "User";
//   const email = storedUser.email || "No email";
//   const roleName =
//     storedUser.roles && storedUser.roles.length > 0
//       ? storedUser.roles[0].name
//       : "No Role";

//   const activePage = location.pathname.split("/")[1] || "dashboard";
//   const searchParams = new URLSearchParams(location.search);
//   const accountsFilter = searchParams.get("filter") || "pending";

//   const sidebarItems = [
//     { title: "Dashboard", icon: LayoutDashboard, page: "dashboard", type: "button" },
//     { title: "Accounts", icon: Users, page: "accounts", type: "accordion" },
//     { title: "Branches", icon: Building2, page: "branches", type: "button" },
//     { title: "Reports", icon: ReportIcon, page: "reports", type: "button", isCustomIcon: true },
//     { title: "Audit Trail", icon: AuditIcon, page: "audit", type: "button", isCustomIcon: true },
//     { title: "User Management", icon: UserCog, page: "user-management", type: "button" },
//     { title: "Settings", icon: Settings, page: "settings", type: "button" },
//   ];

//   const handleNavigation = (page) => {
//     setAccordionValue("");
//     navigate(`/${page}`);
//   };

//   const logout = async () => {
//     try {
//       const result = await AuthService.loginOut();
//       if (result?.success) {
//         localStorage.clear(); // clear all localStorage
//         navigate("/"); // redirect to login/home
//       }
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const handleAccountsFilterChange = (value) => {
//     setAccordionValue("accounts");
//     navigate(`/accounts?filter=${value}`);
//   };

//   return (
//     <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar className="border-r-0 bg-white shadow-sm">
//         <SidebarHeader className="border-b border-gray-100 p-6">
//           <div className="flex items-center gap-3">
//             <img
//               src="/src/assets/convenant_logo.png"
//               alt="Convenant Microfinance Bank"
//               className="w-40 h-[74px] object-contain"
//             />
//           </div>
//         </SidebarHeader>

//         <SidebarContent className="px-4 py-6 flex flex-col flex-1">
//           <SidebarMenu className="space-y-2 flex-1">
//             {sidebarItems.map((item, index) => (
//               <SidebarMenuItem key={index}>
//                 {item.type === "accordion" ? (
//                   <Accordion
//                     type="single"
//                     collapsible
//                     className="w-full"
//                     value={accordionValue}
//                     onValueChange={setAccordionValue}
//                   >
//                     <AccordionItem value="accounts" className="border-none">
//                       <AccordionTrigger
//                         className={`flex items-center w-[238px] h-11 gap-3 pl-3 pr-1.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 no-underline hover:no-underline ${
//                           activePage === "accounts"
//                             ? "bg-[#007046] text-white shadow-sm"
//                             : "text-gray-600 hover:bg-[#007046] hover:text-white"
//                         }`}
//                       >
//                         <div className="flex items-center gap-4">
//                           {item.isCustomIcon ? (
//                             <img src={item.icon} alt={item.title} className="h-5 w-5" />
//                           ) : (
//                             <item.icon className="h-5 w-5" />
//                           )}
//                           <span className="font-medium">{item.title}</span>
//                         </div>
//                       </AccordionTrigger>
//                       <AccordionContent className="pb-0 pt-2">
//                         <div className="ml-9 space-y-1">
//                           <button
//                             onClick={() => handleAccountsFilterChange("pending")}
//                             className={`w-full text-left pl-3 pr-1.5 py-2 text-sm rounded-lg transition-colors ${
//                               accountsFilter === "pending"
//                                 ? "font-medium text-[#007046]"
//                                 : "hover:text-[#007046]"
//                             }`}
//                           >
//                             Pending
//                           </button>
//                           <button
//                             onClick={() => handleAccountsFilterChange("approved")}
//                             className={`w-full text-left pl-3 pr-1.5 py-2 text-sm rounded-lg transition-colors ${
//                               accountsFilter === "approved"
//                                 ? "font-medium text-[#007046]"
//                                 : "hover:text-[#007046]"
//                             }`}
//                           >
//                             Approved
//                           </button>
//                         </div>
//                       </AccordionContent>
//                     </AccordionItem>
//                   </Accordion>
//                 ) : (
//                   <SidebarMenuButton
//                     onClick={() => handleNavigation(item.page)}
//                     className={`h-11 justify-start gap-3 pl-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
//                       activePage === item.page
//                         ? "bg-[#007046] text-white shadow-sm"
//                         : "text-gray-600 hover:bg-[#007046] hover:text-white"
//                     }`}
//                   >
//                     {item.isCustomIcon ? (
//                       <img src={item.icon} alt={item.title} className="h-5 w-5" />
//                     ) : (
//                       <item.icon className="h-5 w-5" />
//                     )}
//                     <span className="font-medium">{item.title}</span>
//                   </SidebarMenuButton>
//                 )}
//               </SidebarMenuItem>
//             ))}
//           </SidebarMenu>

//           {/* User Card at Bottom */}
//           <div className="mt-auto pt-6">
//             <div className="bg-gray-100 rounded-lg p-6 text-center">
//               <div className="flex flex-col items-center space-y-4">
//                 <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
//                   <span className="text-green-800 font-bold text-lg">
//                     {username.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-lg font-semibold text-gray-800">{username}</p>
//                   <p className="text-sm text-gray-600">{email}</p>
//                   <p className="text-sm text-gray-500 font-medium">{roleName}</p>
//                 </div>
//                 <Button
//                   onClick={logout}
//                   className="w-full bg-black text-white hover:bg-gray-800 text-sm py-3 rounded-lg flex items-center justify-between px-4"
//                 >
//                   <span>Logout</span>
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 8l4 4m0 0l-4 4m4-4H3"
//                     />
//                   </svg>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </SidebarContent>
//       </Sidebar>

//       {/* Main Content */}
//       <SidebarInset className="flex-1 flex flex-col bg-gray-50 min-w-0 overflow-hidden">
//         {/* Header */}
//         <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
//           <div className="flex flex-wrap items-center justify-between">
//             <div className="flex items-center gap-4">
//               <SidebarTrigger className="md:hidden" />
//               <div className="flex items-center gap-3 text-gray-700 ml-8">
//                 <span className="text-sm font-medium">Hi, {username}</span>
//               </div>
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 py-2 px-3 rounded-[100px]">
//                 <img src={ComplianceIcon} alt="Compliance Icon" />
//                 <span className="font-medium">{roleName}</span>
//               </div>

//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="relative p-2 hover:bg-gray-100 rounded-lg"
//               >
//                 <Bell className="h-5 w-5 text-gray-600" />
//                 <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-sm">
//                   3
//                 </div>
//               </Button>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-auto bg-gray-50 p-8 min-w-0">
//           <Outlet context={{ accountsFilter }} />
//         </main>
//       </SidebarInset>
//     </div>
//   );
// }



import ComplianceIcon from "../../assets/icons/ComplianceIcon.png";
import ReportIcon from "../../assets/icons/reportIcon.png";
import AuditIcon from "../../assets/icons/auditIcon.png";

import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/authService.js";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarProvider
} from "@/components/ui/sidebar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Building2, UserCog, Settings, Bell } from "lucide-react";

export function BankingLayout() {
  return (
    <SidebarProvider>
      <BankingLayoutContent />
    </SidebarProvider>
  );
}

function BankingLayoutContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [accordionValue, setAccordionValue] = React.useState("");

  // Pull user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("loginResponse")) || {};
  const username = storedUser.username || "User";
  const email = storedUser.email || "No email";
  const roleName =
    storedUser.roles && storedUser.roles.length > 0
      ? storedUser.roles[0].name
      : "No Role";

  const activePage = location.pathname.split("/")[1] || "dashboard";
  const searchParams = new URLSearchParams(location.search);
  const accountsFilter = searchParams.get("filter") || "pending";

  // 1️⃣ Define all sidebar items mapped to areaName
  const sidebarItems = [
    { title: "Dashboard", icon: LayoutDashboard, page: "dashboard", type: "button", areaName: "Dashboard" },
    { title: "Accounts", icon: Users, page: "accounts", type: "accordion", areaName: "Accounts" },
    { title: "Branches", icon: Building2, page: "branches", type: "button", areaName: "Branches" },
    { title: "Reports", icon: ReportIcon, page: "reports", type: "button", isCustomIcon: true, areaName: "Reports" },
    { title: "Audit Trail", icon: AuditIcon, page: "audit", type: "button", isCustomIcon: true, areaName: "Audit Trail" },
    { title: "User Management", icon: UserCog, page: "user-management", type: "button", areaName: "User Management" },
    { title: "Settings", icon: Settings, page: "settings", type: "button", areaName: "Settings" },
  ];

  // 2️⃣ Collect allowed area names from loginResponse
  const allowedAreas = new Set(
    (storedUser.roles || [])
      .flatMap(role => role.areas?.map(area => area.name) || [])
  );

  // 3️⃣ Filter sidebar items — ensure Dashboard is always visible
  const filteredSidebarItems = sidebarItems.filter(
    (item) => item.areaName === "Dashboard" || allowedAreas.has(item.areaName)
  );

  const handleNavigation = (page) => {
    setAccordionValue("");
    navigate(`/${page}`);
  };

  const logout = async () => {
    try {
      const result = await AuthService.loginOut();
      if (result?.success) {
        localStorage.clear();
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleAccountsFilterChange = (value) => {
    setAccordionValue("accounts");
    navigate(`/accounts?filter=${value}`);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar className="border-r-0 bg-white shadow-sm">
        <SidebarHeader className="border-b border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/convenant_logo.png"
              alt="Convenant Microfinance Bank"
              className="w-40 h-[74px] object-contain"
            />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-4 py-6 flex flex-col flex-1">
          <SidebarMenu className="space-y-2 flex-1">
            {filteredSidebarItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                {item.type === "accordion" ? (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    value={accordionValue}
                    onValueChange={setAccordionValue}
                  >
                    <AccordionItem value="accounts" className="border-none">
                      <AccordionTrigger
                        className={`flex items-center w-[238px] h-11 gap-3 pl-3 pr-1.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 no-underline hover:no-underline ${
                          activePage === "accounts"
                            ? "bg-[#007046] text-white shadow-sm"
                            : "text-gray-600 hover:bg-[#007046] hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {item.isCustomIcon ? (
                            <img src={item.icon} alt={item.title} className="h-5 w-5" />
                          ) : (
                            <item.icon className="h-5 w-5" />
                          )}
                          <span className="font-medium">{item.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-0 pt-2">
                        <div className="ml-9 space-y-1">
                          <button
                            onClick={() => handleAccountsFilterChange("pending")}
                            className={`w-full text-left pl-3 pr-1.5 py-2 text-sm rounded-lg transition-colors ${
                              accountsFilter === "pending"
                                ? "font-medium text-[#007046]"
                                : "hover:text-[#007046]"}`
                            }
                          >
                            Pending
                          </button>
                          <button
                            onClick={() => handleAccountsFilterChange("approved")}
                            className={`w-full text-left pl-3 pr-1.5 py-2 text-sm rounded-lg transition-colors ${
                              accountsFilter === "approved"
                                ? "font-medium text-[#007046]"
                                : "hover:text-[#007046]"}`
                            }
                          >
                            Approved
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <SidebarMenuButton
                    onClick={() => handleNavigation(item.page)}
                    className={`h-11 justify-start gap-3 pl-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                      activePage === item.page
                        ? "bg-[#007046] text-white shadow-sm"
                        : "text-gray-600 hover:bg-[#007046] hover:text-white"
                    }`}
                  >
                    {item.isCustomIcon ? (
                      <img src={item.icon} alt={item.title} className="h-5 w-5" />
                    ) : (
                      <item.icon className="h-5 w-5" />
                    )}
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          {/* User Card at Bottom */}
          <div className="mt-auto pt-6">
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                  <span className="text-green-800 font-bold text-lg">
                    {username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-gray-800">{username}</p>
                  <p className="text-sm text-gray-600">{email}</p>
                  <p className="text-sm text-gray-500 font-medium">{roleName}</p>
                </div>
                <Button
                  onClick={logout}
                  className="w-full bg-black text-white hover:bg-gray-800 text-sm py-3 rounded-lg flex items-center justify-between px-4"
                >
                  <span>Logout</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <SidebarInset className="flex-1 flex flex-col bg-gray-50 min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <div className="flex items-center gap-3 text-gray-700 ml-8">
                <span className="text-sm font-medium">Hi, {username}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 py-2 px-3 rounded-[100px]">
                <img src={ComplianceIcon} alt="Compliance Icon" />
                <span className="font-medium">{roleName}</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-sm">
                  3
                </div>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50 p-8 min-w-0">
          <Outlet context={{ accountsFilter }} />
        </main>
      </SidebarInset>
    </div>
  );
}

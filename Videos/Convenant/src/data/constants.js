// Common constants and configuration data
export const APP_CONFIG = {
  APP_NAME: "CONVENANT",
  ITEMS_PER_PAGE: 10,
  DEFAULT_AVATAR_COLOR: "bg-green-600"
};

// User roles and permissions
export const USER_ROLES = {
  COMPLIANCE_OFFICER: "Compliance Officer",
  ADMIN: "Admin",
  MANAGER: "Manager",
  STAFF: "Staff"
};

// Status colors for badges and indicators
export const STATUS_COLORS = {
  ACTIVE: "text-green-600",
  INACTIVE: "text-gray-500",
  SUSPENDED: "text-red-500",
  PENDING: "bg-orange-100 text-orange-700 border-orange-200"
};

// Navigation menu items
export const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    page: "dashboard",
    icon: "LayoutDashboard"
  },
  {
    title: "Accounts",
    page: "accounts",
    icon: "Users"
  },
  {
    title: "Branches",
    page: "branches",
    icon: "Building2"
  },
  {
    title: "Reporting",
    page: "reporting",
    icon: "FileText"
  },
  {
    title: "Audit Trail",
    page: "audit",
    icon: "Shield"
  },
  {
    title: "User Management",
    page: "users",
    icon: "UserCog"
  },
  {
    title: "Settings",
    page: "settings",
    icon: "Settings"
  }
];

// Table column configurations
export const TABLE_COLUMNS = {
  ACCOUNTS: [
    { key: "date", label: "Date", width: "w-32" },
    { key: "fullName", label: "Full Name", width: "w-40" },
    { key: "phone", label: "Phone Number", width: "w-32" },
    { key: "email", label: "Email", width: "w-48" },
    { key: "bvn", label: "BVN", width: "w-32" },
    { key: "accountNumber", label: "Account Number", width: "w-36" },
    { key: "accountType", label: "Account Type", width: "w-36" },
    { key: "tier", label: "Tier", width: "w-20" },
    { key: "channel", label: "Channel", width: "w-32" },
    { key: "branch", label: "Branch", width: "w-32" }
  ],
  DASHBOARD_REGISTRATIONS: [
    { key: "date", label: "Date" },
    { key: "fullName", label: "Full Name" },
    { key: "phone", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "bvn", label: "BVN" },
    { key: "accountNumber", label: "Account Number" },
    { key: "accountType", label: "Account Type" },
    { key: "channel", label: "Channel" },
    { key: "status", label: "Status" }
  ]
};

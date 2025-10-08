// Enhanced users data for user management
export const usersData = {
  users: [
    {
      id: 1,
      userId: "CMFB001",
      fullName: "Adebayo Salami",
      email: "manhhaachkt08@gmail.com",
      role: "Super Admin",
      location: "Ado Odo Ota",
      status: "Active",
      dateCreated: "2023-01-15",
      lastLogin: "2023-06-15T10:30:00Z"
    },
    {
      id: 2,
      userId: "CMFB002",
      fullName: "Oladejo Israel",
      email: "nvt.lisst.nute@gmail.com",
      role: "Admin",
      location: "Abeokuta",
      status: "Inactive",
      dateCreated: "2023-02-20",
      lastLogin: "2023-06-10T14:20:00Z"
    },
    {
      id: 3,
      userId: "CMFB003",
      fullName: "Nneka Chukwu",
      email: "binhan629@gmail.com",
      role: "Compliance Officer",
      location: "Sagamu",
      status: "Active",
      dateCreated: "2023-03-10",
      lastLogin: "2023-06-15T09:15:00Z"
    },
    {
      id: 4,
      userId: "CMFB004",
      fullName: "Desmond Tutu",
      email: "ckctm12@gmail.com",
      role: "Compliance Officer",
      location: "Abeokuta",
      status: "Active",
      dateCreated: "2023-03-25",
      lastLogin: "2023-06-14T16:45:00Z"
    },
    {
      id: 5,
      userId: "CMFB005",
      fullName: "Jide Kosoko",
      email: "vuhaithuongnute@gmail.com",
      role: "Compliance Officer",
      location: "Abeokuta",
      status: "Inactive",
      dateCreated: "2023-04-05",
      lastLogin: "2023-06-08T11:30:00Z"
    },
    {
      id: 6,
      userId: "CMFB005",
      fullName: "Adebanij Bolaji",
      email: "thuhang.nute@gmail.com",
      role: "Compliance Officer",
      location: "Ado Odo Ota",
      status: "Active",
      dateCreated: "2023-04-12",
      lastLogin: "2023-06-15T08:20:00Z"
    },
    {
      id: 7,
      userId: "CMFB005",
      fullName: "Baba Kaothat",
      email: "danghoang87hi@gmail.com",
      role: "Compliance Officer",
      location: "Ado Odo Ota",
      status: "Active",
      dateCreated: "2023-04-18",
      lastLogin: "2023-06-14T13:10:00Z"
    },
    {
      id: 8,
      userId: "CMFB005",
      fullName: "Jibike Alanape",
      email: "trungkiensipktnkl@gamail.com",
      role: "Compliance Officer",
      location: "Abeokuta",
      status: "Active",
      dateCreated: "2023-05-02",
      lastLogin: "2023-06-15T07:45:00Z"
    },
    {
      id: 9,
      userId: "CMFB005",
      fullName: "Adegboyega Precious",
      email: "tienlapsipktnkl@gmail.com",
      role: "Compliance Officer",
      location: "Ado Odo Ota",
      status: "Inactive",
      dateCreated: "2023-05-08",
      lastLogin: "2023-06-12T12:25:00Z"
    },
    {
      id: 10,
      userId: "CMFB005",
      fullName: "Eze Chinedu",
      email: "tranthuy.nute@gmail.com",
      role: "Compliance Officer",
      location: "Ijebu Ode",
      status: "Active",
      dateCreated: "2023-05-15",
      lastLogin: "2023-06-15T15:30:00Z"
    },
    {
      id: 11,
      userId: "CMFB005",
      fullName: "Damilare Usman",
      email: "tienlapsipktnkl@gmail.com",
      role: "Compliance Officer",
      location: "Abeokuta",
      status: "Active",
      dateCreated: "2023-05-20",
      lastLogin: "2023-06-14T10:15:00Z"
    }
  ],
  
  locations: [
    "Ado Odo Ota",
    "Abeokuta", 
    "Sagamu",
    "Ijebu Ode"
  ]
};

// Roles and permissions data
export const rolesData = {
  roles: [
    {
      id: 1,
      name: "Super Admin",
      userCount: 1,
      permissions: {
        users: ["create", "view", "edit", "delete"],
        accounts: ["approve", "decline", "view"],
        branches: ["create", "view", "edit", "delete"],
        auditRail: ["view", "download"],
        reports: ["view", "download"]
      }
    },
    {
      id: 2,
      name: "Admin Admin", 
      userCount: 2,
      permissions: {
        users: ["create", "view", "edit"],
        accounts: ["approve", "decline", "view"],
        branches: ["view", "edit"],
        auditRail: ["view", "download"],
        reports: ["view", "download"]
      }
    },
    {
      id: 3,
      name: "Branch Manager",
      userCount: 1,
      permissions: {
        users: ["view"],
        accounts: ["decline", "view"],
        auditRail: ["view", "download"],
        reports: ["view", "download"]
      }
    },
    {
      id: 4,
      name: "Compliance Officer",
      userCount: 10,
      permissions: {
        accounts: ["approve", "decline", "view"]
      }
    }
  ],
  
  permissionCategories: [
    {
      name: "Super Admin",
      permissions: ["Check All"]
    },
    {
      name: "User Management", 
      permissions: ["Create", "View", "Edit", "Delete"]
    },
    {
      name: "Accounts",
      permissions: ["View", "Approve", "Decline"]
    },
    {
      name: "Branches",
      permissions: ["Create", "View", "Edit", "Delete"]
    },
    {
      name: "Audit Rail",
      permissions: ["View", "Download"]
    },
    {
      name: "Reports",
      permissions: ["View", "Download"]
    }
  ]
};
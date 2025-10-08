// Mock data for audit trail functionality
export const auditData = {
  users: [
    {
      id: 1,
      name: "Adese Samson",
      role: "Admin Officer",
      email: "adese.samson@covenant.com",
      recentActivities: [
        {
          activity: "Login",
          timestamp: "2023-06-10T14:00:00Z"
        },
        {
          activity: "Sign Out",
          timestamp: "2023-06-10T15:45:00Z"
        }
      ],
      activities: [
        {
          activity: "Logged in",
          description: "Logged into Covenant MFB",
          timestamp: "2023-05-23T05:20:45Z"
        },
        {
          activity: "Approved",
          description: "Approved Oluaseun Ajao's Account",
          timestamp: "2023-05-23T05:28:59Z"
        },
        {
          activity: "Viewed Notification",
          description: "Viewed pending notification",
          timestamp: "2023-05-23T05:30:45Z"
        },
        {
          activity: "Download Report",
          description: "Downloaded Account Report",
          timestamp: "2023-05-23T05:33:45Z"
        },
        {
          activity: "Created user",
          description: "Created Josiah Tobi as compliance officer",
          timestamp: "2023-05-23T05:34:45Z"
        },
        {
          activity: "Deactivated User",
          description: "Deactivated Josiah Tobi as compliance officer",
          timestamp: "2023-05-23T05:36:45Z"
        },
        {
          activity: "Audit trail",
          description: "Viewed audit trail",
          timestamp: "2023-05-23T05:37:45Z"
        },
        {
          activity: "Edit User",
          description: "Edited Tosin Bajomo's user details",
          timestamp: "2023-05-23T05:39:45Z"
        },
        {
          activity: "Role management",
          description: "Modified Compliance Role management",
          timestamp: "2023-05-23T05:40:45Z"
        },
        {
          activity: "Viewed Account",
          description: "viewed Uche's Account",
          timestamp: "2023-05-23T05:43:45Z"
        },
        {
          activity: "Logged Out",
          description: "Logged out of parkway wallet",
          timestamp: "2023-05-23T05:50:45Z"
        },
        {
          activity: "Sign Out",
          description: "Signed out of system",
          timestamp: "2023-06-11T03:15:00Z"
        },
        {
          activity: "Login",
          description: "Logged into system",
          timestamp: "2023-06-12T09:00:00Z"
        }
      ]
    },
    {
      id: 2,
      name: "Israel Faizul",
      role: "Compliance Officer",
      email: "israel.faizul@covenant.com",
      recentActivities: [
        {
          activity: "Login",
          timestamp: "2023-06-10T09:30:00Z"
        }
      ],
      activities: [
        {
          activity: "Logged in",
          description: "Logged into Covenant MFB",
          timestamp: "2023-05-23T09:30:00Z"
        },
        {
          activity: "Reviewed Document",
          description: "Reviewed compliance document for account opening",
          timestamp: "2023-05-23T09:45:00Z"
        },
        {
          activity: "Updated Profile",
          description: "Updated user profile information",
          timestamp: "2023-05-23T10:15:00Z"
        },
        {
          activity: "Generated Report",
          description: "Generated monthly compliance report",
          timestamp: "2023-05-23T11:00:00Z"
        },
        {
          activity: "Logged Out",
          description: "Logged out of system",
          timestamp: "2023-05-23T17:30:00Z"
        }
      ]
    },
    {
      id: 3,
      name: "Yussuf Ahmed",
      role: "Compliance Officer",
      email: "yussuf.ahmed@covenant.com",
      recentActivities: [
        {
          activity: "Login",
          timestamp: "2023-06-09T08:00:00Z"
        }
      ],
      activities: [
        {
          activity: "Logged in",
          description: "Logged into Covenant MFB",
          timestamp: "2023-05-23T08:00:00Z"
        },
        {
          activity: "Account Review",
          description: "Reviewed customer account for compliance",
          timestamp: "2023-05-23T08:30:00Z"
        },
        {
          activity: "Document Upload",
          description: "Uploaded KYC documents for verification",
          timestamp: "2023-05-23T09:15:00Z"
        },
        {
          activity: "Approved Transaction",
          description: "Approved high-value transaction",
          timestamp: "2023-05-23T10:45:00Z"
        },
        {
          activity: "Logged Out",
          description: "Logged out of system",
          timestamp: "2023-05-23T16:00:00Z"
        }
      ]
    },
    {
      id: 4,
      name: "Hannah Pedro",
      role: "Compliance Officer",
      email: "hannah.pedro@covenant.com",
      recentActivities: [
        {
          activity: "Login",
          timestamp: "2023-06-08T10:00:00Z"
        }
      ],
      activities: [
        {
          activity: "Logged in",
          description: "Logged into Covenant MFB",
          timestamp: "2023-05-23T10:00:00Z"
        },
        {
          activity: "Risk Assessment",
          description: "Conducted risk assessment for new client",
          timestamp: "2023-05-23T10:30:00Z"
        },
        {
          activity: "Policy Update",
          description: "Updated compliance policy documents",
          timestamp: "2023-05-23T11:45:00Z"
        },
        {
          activity: "Training Session",
          description: "Attended compliance training session",
          timestamp: "2023-05-23T14:00:00Z"
        },
        {
          activity: "Logged Out",
          description: "Logged out of system",
          timestamp: "2023-05-23T18:00:00Z"
        }
      ]
    },
    {
      id: 5,
      name: "Oyebamiji Oluwasola",
      role: "Compliance Officer",
      email: "oyebamiji.oluwasola@covenant.com",
      recentActivities: [
        {
          activity: "Login",
          timestamp: "2023-06-07T09:15:00Z"
        }
      ],
      activities: [
        {
          activity: "Logged in",
          description: "Logged into Covenant MFB",
          timestamp: "2023-05-23T09:15:00Z"
        },
        {
          activity: "Fraud Investigation",
          description: "Investigated suspicious transaction activity",
          timestamp: "2023-05-23T09:45:00Z"
        },
        {
          activity: "Report Submission",
          description: "Submitted fraud investigation report",
          timestamp: "2023-05-23T12:30:00Z"
        },
        {
          activity: "Client Interview",
          description: "Conducted client interview for due diligence",
          timestamp: "2023-05-23T15:00:00Z"
        },
        {
          activity: "Logged Out",
          description: "Logged out of system",
          timestamp: "2023-05-23T17:15:00Z"
        }
      ]
    },
    {
      id: 6,
      name: "Toluwani Bakare",
      role: "Compliance Officer",
      email: "toluwani.bakare@covenant.com",
      recentActivities: [
        {
          activity: "Login",
          timestamp: "2023-06-06T08:30:00Z"
        }
      ],
      activities: [
        {
          activity: "Logged in",
          description: "Logged into Covenant MFB",
          timestamp: "2023-05-23T08:30:00Z"
        },
        {
          activity: "Compliance Check",
          description: "Performed routine compliance check",
          timestamp: "2023-05-23T09:00:00Z"
        },
        {
          activity: "Document Review",
          description: "Reviewed customer onboarding documents",
          timestamp: "2023-05-23T10:30:00Z"
        },
        {
          activity: "System Update",
          description: "Updated customer compliance status",
          timestamp: "2023-05-23T13:15:00Z"
        },
        {
          activity: "Logged Out",
          description: "Logged out of system",
          timestamp: "2023-05-23T16:45:00Z"
        }
      ]
    },
    {
      id: 7,
      name: "Jicholia Oyebola",
      role: "Compliance Officer",
      email: "jicholia.oyebola@covenant.com",
      recentActivities: [
        {
          activity: "Login",
          timestamp: "2023-06-05T11:00:00Z"
        }
      ],
      activities: [
        {
          activity: "Logged in",
          description: "Logged into Covenant MFB",
          timestamp: "2023-05-23T11:00:00Z"
        },
        {
          activity: "Audit Preparation",
          description: "Prepared documents for regulatory audit",
          timestamp: "2023-05-23T11:30:00Z"
        },
        {
          activity: "Meeting Attendance",
          description: "Attended compliance committee meeting",
          timestamp: "2023-05-23T14:00:00Z"
        },
        {
          activity: "Data Analysis",
          description: "Analyzed transaction patterns for compliance",
          timestamp: "2023-05-23T16:00:00Z"
        },
        {
          activity: "Logged Out",
          description: "Logged out of system",
          timestamp: "2023-05-23T18:30:00Z"
        }
      ]
    },
    {
      id: 8,
      name: "Justina Ogbonnaya",
      role: "Compliance Officer",
      email: "justina.ogbonnaya@covenant.com",
      recentActivities: [
        {
          activity: "Login",
          timestamp: "2023-06-04T07:45:00Z"
        }
      ],
      activities: [
        {
          activity: "Logged in",
          description: "Logged into Covenant MFB",
          timestamp: "2023-05-23T07:45:00Z"
        },
        {
          activity: "Customer Verification",
          description: "Verified new customer identity documents",
          timestamp: "2023-05-23T08:15:00Z"
        },
        {
          activity: "Regulatory Filing",
          description: "Submitted regulatory compliance filing",
          timestamp: "2023-05-23T10:00:00Z"
        },
        {
          activity: "Quality Review",
          description: "Conducted quality review of compliance processes",
          timestamp: "2023-05-23T13:30:00Z"
        },
        {
          activity: "Logged Out",
          description: "Logged out of system",
          timestamp: "2023-05-23T17:00:00Z"
        }
      ]
    },
    {
      id: 9,
      name: "Ebubechukwu Agnes",
      role: "Compliance Officer",
      email: "ebubechukwu.agnes@covenant.com",
      recentActivities: [
        {
          activity: "Login",
          timestamp: "2023-06-03T09:30:00Z"
        }
      ],
      activities: [
        {
          activity: "Logged in",
          description: "Logged into Covenant MFB",
          timestamp: "2023-05-23T09:30:00Z"
        },
        {
          activity: "Policy Review",
          description: "Reviewed updated compliance policies",
          timestamp: "2023-05-23T10:00:00Z"
        },
        {
          activity: "Training Completion",
          description: "Completed anti-money laundering training",
          timestamp: "2023-05-23T12:00:00Z"
        },
        {
          activity: "Case Investigation",
          description: "Investigated compliance violation case",
          timestamp: "2023-05-23T14:30:00Z"
        },
        {
          activity: "Logged Out",
          description: "Logged out of system",
          timestamp: "2023-05-23T16:30:00Z"
        }
      ]
    },
    {
      id: 10,
      name: "Boluwatife Olusola",
      role: "Compliance Officer",
      email: "boluwatife.olusola@covenant.com",
      recentActivities: [
        {
          activity: "Login",
          timestamp: "2023-06-02T08:15:00Z"
        }
      ],
      activities: [
        {
          activity: "Logged in",
          description: "Logged into Covenant MFB",
          timestamp: "2023-05-23T08:15:00Z"
        },
        {
          activity: "Risk Monitoring",
          description: "Monitored high-risk account activities",
          timestamp: "2023-05-23T08:45:00Z"
        },
        {
          activity: "Compliance Report",
          description: "Generated weekly compliance report",
          timestamp: "2023-05-23T11:00:00Z"
        },
        {
          activity: "System Maintenance",
          description: "Updated compliance monitoring system",
          timestamp: "2023-05-23T15:00:00Z"
        },
        {
          activity: "Logged Out",
          description: "Logged out of system",
          timestamp: "2023-05-23T17:45:00Z"
        }
      ]
    },
    {
      id: 11,
      name: "Tolani Bayode",
      role: "Compliance Officer",
      email: "tolani.bayode@covenant.com",
      recentActivities: [
        {
          activity: "Login",
          timestamp: "2023-06-01T10:30:00Z"
        }
      ],
      activities: [
        {
          activity: "Logged in",
          description: "Logged into Covenant MFB",
          timestamp: "2023-05-23T10:30:00Z"
        },
        {
          activity: "Customer Due Diligence",
          description: "Performed enhanced due diligence on VIP client",
          timestamp: "2023-05-23T11:00:00Z"
        },
        {
          activity: "Documentation Update",
          description: "Updated compliance documentation templates",
          timestamp: "2023-05-23T13:45:00Z"
        },
        {
          activity: "Team Meeting",
          description: "Participated in compliance team meeting",
          timestamp: "2023-05-23T15:30:00Z"
        },
        {
          activity: "Logged Out",
          description: "Logged out of system",
          timestamp: "2023-05-23T18:15:00Z"
        }
      ]
    }
  ]
};
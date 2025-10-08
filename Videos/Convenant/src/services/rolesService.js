import API from "./api";

const userService = {
  createRole: async (credentials) => {
    const res = await API.post("Roles/with-permissions", credentials);
    return res.data;
  },
  getRoles: async () => {
    const res = await API.get("/Roles"); // endpoint from your backend
    return res.data?.data || []; // ensure only the roles array is returned
  },

  getRolesWithPermission: async () => {
    const res = await API.get("/Roles/areas/with-permissions"); // endpoint from your backend
    return res.data?.data || []; // ensure only the roles array is returned
  },

  getAllPermissions: async () => {
    const res = await API.get("/Roles/permissions"); // endpoint from your backend
    return res.data?.data || []; // ensure only the roles array is returned
  },

  editRoleForUser: async (id,credentials) => {
    const res = await API.patch(`Roles/${id}/with-permissions`, credentials);
    return res.data;
  },

  getRoleWithDetails: async () => {
    const res = await API.get("/Roles/with-details"); // endpoint from your backend
    return res.data?.data || []; // ensure only the roles array is returned
  },
};

export default userService;
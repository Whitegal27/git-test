import API from "./api";

const userService = {
  createUser: async (credentials) => {
    const res = await API.post("Users", credentials);
    return res.data; // gives you { success, message, data, errors }
  },
  getUsers: async () => {
    const res = await API.get("Users");
    return res.data;
  },
  deactivateUser: async (id) => {
    const res = await API.post(`Users/${id}/deactivate`, {});
    return res.data; // gives you { success, message, data, errors }
  },
  activateUser: async (id) => {
    const res = await API.post(`Users/${id}/activate`, {});
    return res.data; // gives you { success, message, data, errors }
  },
  getWithRoles: async () => {
    const res = await API.get("Users/with-detailed-roles");
    return res.data;
  },
  updateUser: async (id, credentials) => {
    const res = await API.patch(`Users/${id}`, credentials);
    return res.data; // gives you { success, message, data, errors }
  },
};

export default userService;

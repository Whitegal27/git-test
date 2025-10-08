import API from "./api";

const BranchService = {

    getBranch: async () => {
        const res = await API.get("FinEdge/branches/available");
        // return just the array, not the whole object
        return res.data?.data || [];
      },

  getBranchById: async (branchId) => {
    const res = await API.get(`/Branches/${branchId}`);
    return res.data.data;
  },
};

export default BranchService;

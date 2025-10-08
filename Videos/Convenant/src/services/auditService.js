// services/auditService.js
import API from "./api";

const AuditService = {
  // getAudit: async (params = {}) => {
  //   const res = await API.get("/Audit", { params });
  //   // if your API returns { data: { items: [], totalCount: number } }
  //   // don’t strip everything here, let the page decide how to handle it
  //   return res.data?.data;
  // },
  getAudit: async (params = {}) => {
    const res = await API.get("/Audit/sessions", {
      params: {
        userId: params.userId,
        page: params.page ?? 1,
        pageSize: params.pageSize ?? 10,
        startDate: params.startDate,
        endDate: params.endDate,
        includeIncompleteSessions: params.includeIncompleteSessions ?? true,
      },
    });

    return res.data?.data;
  },
};

export default AuditService;

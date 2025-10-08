import API from "./api";
import authApi from "./authApi";
import RefreshAPI from "./refreshApi";

const AuthService = {
  login: async (credentials) => {
    const res = await authApi.post("Auth/begin", credentials);
    return res.data; // gives you { success, message, data, errors }
  },

  verifyOtp: async (credentials) => {
    const res = await authApi.post("Auth/complete", credentials);
    return res.data; // gives you { success, message, data, errors }
  },

  loginOut: async () => {
    const res = await API.post("Auth/logout", {});
    return res.data;
  },

  getUserInfo: async () => {
    const res = await API.get("Auth/me");
    return res.data;
  },

  // refreshToken: async () => {
  //   const refreshToken = localStorage.getItem("refreshToken");
  //   console.log("Using refresh token:", refreshToken);

  //   if (!refreshToken) return null;

  //   // try {
  //   //   const res = await RefreshAPI.post("Auth/refresh", { refreshToken });
  //   //   console.log("Refresh response:", res);

  //   //   if (res.data?.success) {
  //   //     const { accessToken, refreshToken: newRefresh, expiresIn } = res.data.data;

  //   //     localStorage.setItem("token", accessToken);
  //   //     localStorage.setItem("refreshToken", newRefresh);
  //   //     localStorage.setItem("expiresIn", expiresIn.toString());
  //   //     localStorage.setItem("loginTime", Date.now().toString());

  //   //     return accessToken;
  //   //   }
  //   //   return null;
  //   // } catch (err) {
  //   //   console.error("Failed to refresh token:", err);
  //   //   return null;
  //   // }

    
  // },
  
  // refreshToken: async () => {
  //   const refreshToken = localStorage.getItem("refreshToken");
  //   if (!refreshToken) {
  //     console.warn("No refresh token found in storage");
  //     return null;
  //   }

  //   try {
  //     const res = await RefreshAPI.post("Auth/refresh", { refreshToken });

  //     if (res.data?.success) {
  //       const { accessToken, refreshToken: newRefresh, expiresIn } = res.data.data;

  //       // Save to localStorage
  //       localStorage.setItem("token", accessToken);
  //       localStorage.setItem("refreshToken", newRefresh);
  //       localStorage.setItem("expiresIn", expiresIn.toString());
  //       localStorage.setItem("loginTime", Date.now().toString());

  //       // Update axios default for future requests
  //       API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  //       console.log("Token refreshed successfully");
  //       return accessToken;
  //     }

  //     console.error("Refresh API failed:", res.data?.message);
  //     return null;
  //   } catch (err) {
  //     console.error("Refresh token request failed:", err);
  //     return null;
  //   }
  // },

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return null;

      const response = await RefreshAPI.post("auth/refresh-token", {
        refreshToken,
      });

      if (response.data?.success) {
        const { accessToken, refreshToken: newRefresh, expiresIn } = response.data.data;

        // Save new values
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", newRefresh);
        localStorage.setItem("expiresIn", expiresIn.toString());
        localStorage.setItem("loginTime", Date.now().toString());

        return accessToken;
      }

      return null;
    } catch (error) {
      console.error("Refresh failed", error);
      return null;
    }
  },
};

export default AuthService;

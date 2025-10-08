import axios from "axios";

const RefreshAPI = axios.create({
    baseURL: "https://staging.uridiumworks.com/cmfb.account.api/api/",
    headers: { "Content-Type": "application/json" },
  });

  export default RefreshAPI;
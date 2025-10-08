// App.jsx
// import React, { useEffect } from "react";
// // import { useNavigate } from "react-router-dom"; // ✅ import navigate
// import { AuthProvider } from "./contexts/AuthContext";
// import { AppRouter } from "./AppRouter";
// import { ToastProvider } from "./components/ui/use-toast";
// import AuthService from "./services/authService";
// import "./App.css";

// function App() {
// // ✅ initialize navigate
//   // Logout function
//   const logout = async () => {
//     try {
//       await AuthService.loginOut();
//     } catch (err) {
//       console.error("Logout failed", err);
//     } finally {
//       localStorage.clear(); // clear all localStorage
//       window.location.href = "/"// redirect to login/home
//     }
//   };

//   useEffect(() => {
//     // 1️⃣ Background token refresh every minute
//     const refreshInterval = setInterval(async () => {
//       const loginTime = parseInt(localStorage.getItem("loginTime") || "0", 10);
//       const expiresIn = parseInt(localStorage.getItem("expiresIn") || "0", 10);
//       const elapsed = Math.floor((Date.now() - loginTime) / 1000);

//       if (expiresIn && expiresIn - elapsed < 300) {
//         try {
//           const newToken = await AuthService.refreshToken();
//           if (newToken) {
//             console.log("🔄 Token refreshed in background");
//           }
//         } catch (err) {
//           console.error("Background refresh failed", err);
//         }
//       }
//     }, 60 * 1000);

//     // 2️⃣ Auto logout after max idle time
//     let logoutTimer;
//     const MAX_IDLE_TIME = 7 * 60 * 1000; // 30 minutes

//     const resetLogoutTimer = () => {
//       clearTimeout(logoutTimer);
//       logoutTimer = setTimeout(() => {
//         console.warn("⏰ Session expired due to inactivity");
//         logout(); // ✅ call the async logout function
//       }, MAX_IDLE_TIME);
//     };

//     // Reset timer on user activity
//     const events = ["mousemove", "keydown", "click", "scroll"];
//     events.forEach((event) => window.addEventListener(event, resetLogoutTimer));

//     // Start timer initially
//     resetLogoutTimer();

//     // Cleanup
//     return () => {
//       clearInterval(refreshInterval);
//       clearTimeout(logoutTimer);
//       events.forEach((event) =>
//         window.removeEventListener(event, resetLogoutTimer)
//       );
//     };
//   }, []);

//   return (
//     <AuthProvider>
//       <ToastProvider>
//         <AppRouter />
//       </ToastProvider>
//     </AuthProvider>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRouter } from "./AppRouter";
import { ToastProvider } from "./components/ui/use-toast";
import AuthService from "./services/authService";
import "./App.css";

function App() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const loginTime = parseInt(localStorage.getItem("loginTime") || "0", 10);
      const expiresIn = parseInt(localStorage.getItem("expiresIn") || "0", 10);
      const elapsed = Math.floor((Date.now() - loginTime) / 1000);

      // If less than 5 min left, refresh proactively
      if (expiresIn && expiresIn - elapsed < 300) {
        try {
          const newToken = await AuthService.refreshToken();
          if (newToken) {
            console.log("🔄 Token refreshed in background");
          }
        } catch (err) {
          console.error("❌ Background refresh failed", err);
        }
      }
    }, 60 * 1000); // check every 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
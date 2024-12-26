document.addEventListener("DOMContentLoaded", () => {
    const sessionKey = "userSession"; 
    const sessionTimeout = 5 * 60 * 60 * 1000; // 5 hours
  
    const sessionData = JSON.parse(localStorage.getItem(sessionKey));
    const isOnDashboard = window.location.pathname.includes("dashboard.html");
    const loginForm = document.getElementById("loginForm");
  
    if (loginForm && sessionData && new Date().getTime() - sessionData.timestamp < sessionTimeout) {
      window.location.href = "dashboard.html"; 
    }
  
    if (isOnDashboard) {
        if (!sessionData || new Date().getTime() - sessionData.timestamp >= sessionTimeout) {
          window.location.href = "./login.html"; 
        }
      }
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
  
        if (username === "admin" && password === "12345") {
          localStorage.setItem(
            sessionKey,
            JSON.stringify({ username, timestamp: new Date().getTime() })
          );
          window.location.href = "dashboard.html";
        } else {
          alert("Invalid username or password!");
        }
      });
    }
  
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem(sessionKey); 
        window.location.href = "login.html";
      });
    }
  });
  
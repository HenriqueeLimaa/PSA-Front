import "./App.css";
import { useState, useEffect } from "react";
import { SigninPage } from "./pages/signinPage/signinPage";
import { AdminDashboard } from "./pages/adminDashboard/adminDashboard";

function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("token") || ""
  );
  const [loginResponse, setLoginResponse] = useState("");
  const [showLogin, setShowLogin] = useState(!localStorage.getItem("token"));

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setAccessToken("");
    setShowLogin(true);
  };

  const loginHandler = () => {
    // login info
    const loginInfo = {
      username: document.getElementById("emailInput").value,
      password: document.getElementById("passwordInput").value,
    };

    // send a json with login info
    fetch("http://localhost:8081/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://127.0.0.1:5173",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoginResponse(data);
        localStorage.setItem("token", data.accessToken);
        setAccessToken(data.accessToken);
        setShowLogin(false);
      });
  };

  return (
    <div className="app-container">
      {showLogin && <SigninPage onLogin={loginHandler} />}
      {!showLogin && (
        <AdminDashboard token={accessToken} onLogout={logoutHandler} />
      )}
    </div>
  );
}

export default App;

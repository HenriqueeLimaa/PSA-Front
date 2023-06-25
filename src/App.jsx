import "./App.css";
import { useState, useEffect } from "react";
import { SigninPage } from "./pages/signinPage/signinPage";
import { AdminDashboard } from "./pages/adminDashboard/adminDashboard";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
  };

  const loginHandler = () => {
    const loginInfo = {
      username: document.getElementById("emailInput").value,
      password: document.getElementById("passwordInput").value,
    };

    fetch("http://localhost:8081/api/auth/signin", {
      method: "POST",
      headers: {
        Origin: "http://127.0.0.1:5173",
      },
      body: loginInfo,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="app-container">
      <SigninPage onLogin={loginHandler} />
      {/* <AdminDashboard /> */}
    </div>
  );
}

export default App;

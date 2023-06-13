import "./App.css";
import { useState } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SigninPage } from "./pages/signinPage/signinPage";
import { AdminDashboard } from "./pages/adminDashboard/adminDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  let isLoggedInStorage = localStorage.getItem('isLoggedIn');

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', false);
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
  };

  return (
    <div className="app-container">
      {isLoggedIn === false && <SigninPage onLogin={loginHandler} />}
      {isLoggedIn === true && <AdminDashboard onLogout={logoutHandler} isAdmin={isAdmin} />}

      {/* <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;

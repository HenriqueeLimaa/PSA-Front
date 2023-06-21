import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { SigninPage } from "./pages/signinPage/signinPage";
import { AdminDashboard } from "./pages/adminDashboard/adminDashboard";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Faça uma requisição para o backend para verificar se o token é válido
      axios
        .get('http://localhost:8081/api/validate-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setIsAdmin(true);
        })
        .catch(() => {
          setIsAdmin(false);
        });
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
  };

  const loginHandler = () => {
    setIsAdmin(true);
  };

  const renderContent = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return <AdminDashboard onLogout={logoutHandler} isAdmin={isAdmin} />;
    } else {
      return <SigninPage onLogin={loginHandler} />;
    }
  };

  return (
    <div className="app-container">
      {/* {renderContent()} */}
      <AdminDashboard />

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
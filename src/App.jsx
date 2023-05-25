import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SigninPage } from "./pages/signinPage/signinPage";
import { AdminDashboard } from "./pages/adminDashboard/adminDashboard";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

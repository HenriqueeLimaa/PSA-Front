import { useState } from "react";
import "./adminDashboard.css";
import { RefundItem } from "../../components/dashboard/refundItem";

export const AdminDashboard = () => {
  // mocka 3 items na lista
  const [refundItemsList, setRefundItemsList] = useState(["", "", "", "", ""]);
  const userType = "normal";

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="logout-container">
          <span>{userType}</span>
          <button>Logout</button>
        </div>
        {userType === "normal" && (
          <div className="create-refund-container">
            <label htmlFor="create-request">Create a refund request</label>
            <textarea id="create-request" className="create-request-input" />
            <button className="send-request-button">Send request</button>
          </div>
        )}
        <div className="refund-items-container">
          {refundItemsList.map((item, index) => {
            return <RefundItem key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

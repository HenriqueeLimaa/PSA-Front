/* eslint-disable react/prop-types */
import { useState } from "react";
import "./adminDashboard.css";
import { RefundItem } from "../../components/dashboard/refundItem";

export const AdminDashboard = (props) => {
  // mocka 3 items na lista
  const [refundItemsList, setRefundItemsList] = useState(["", "", "", "", ""]);
  const userType = "normal";
  
  document.title = props.isAdmin ? 'Admin dashboard' : 'User dashboard'

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="logout-container">
          <span>{props.isAdmin ? 'Admin' : 'Normal User'}</span>
          <button onClick={props.onLogout}>Logout</button>
        </div>
        {!props.isAdmin && (
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

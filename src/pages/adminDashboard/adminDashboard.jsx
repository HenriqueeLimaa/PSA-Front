/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./adminDashboard.css";
import { RefundItem } from "../../components/dashboard/refundItem";

export const AdminDashboard = (props) => {
  const [refundItemsList, setRefundItemsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/refundRequests", {
      method: "GET",
      headers: {
        Origin: "http://127.0.0.1:5173",
      },
    })
      .then((res) => res.json())
      .then((data) => setRefundItemsList(data));
  }, []);

  // printa a lista no console sempre que ela é atualizada. A lista deve ser atualizada ao fazer o fetch
  useEffect(() => {
    console.log(refundItemsList);
  }, [refundItemsList]);

  document.title = props.isAdmin ? "Admin dashboard" : "User dashboard";

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="logout-container">
          <span>{props.isAdmin ? "Admin" : "Normal User"}</span>
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
          {refundItemsList.map((item) => {
            return (
              <RefundItem
                key={item.id}
                value={item.value}
                date={item.date}
                description={item.desc}
                user={item.user}
              />
            );
          })}
          {/* <button onClick={fetchHandler}>fetch</button> */}
        </div>
      </div>
    </div>
  );
};

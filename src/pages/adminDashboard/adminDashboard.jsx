/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import moment from "moment";
import "./adminDashboard.css";
import { RefundItem } from "../../components/dashboard/refundItem";

export const AdminDashboard = (props) => {
  const [refundItemsList, setRefundItemsList] = useState([]);
  const [logsHTML, setLogsHTML] = useState("");
  const newRequestValue = useRef();
  const descriptionValue = useRef();

  const fetchRefundRequests = () => {
    fetch("http://localhost:8081/api/refundRequests", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setRefundItemsList(data));
  };

  const fetchLogs = () => {
    fetch("http://localhost:8081/api/refundReport", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((res) => res.text())
      .then((data) => setLogsHTML(data));
  };

  // Puxa a lista de requests e logs do back
  useEffect(() => {
    fetchRefundRequests();
    fetchLogs();
  }, []);

  const getCurrentDate = () => {
    const currentDate = moment().format("DD/MM/YYYY");
    return currentDate;
  };

  //cria uma nova request
  const createRequestHandler = () => {
    const currentDate = getCurrentDate();

    const requestBody = {
      value: newRequestValue.current.value,
      date: currentDate,
      status: "PENDENTE",
      desc: descriptionValue.current.value,
      userId: props.userId,
    };

    fetch("http://localhost:8081/api/refundRequests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
        Origin: "http://127.0.0.1:5173",
      },
      body: JSON.stringify(requestBody),
    });

    // atualiza a lista de refunds e logs
    setTimeout(() => {
      fetchRefundRequests();
      fetchLogs();
    }, 2000);
  };

  // O parametro type é uma string que receberá "ACEITO" ou "RECUSADO"
  const onUpdateStatusHandler = (refundId, refund, type) => {
    const { id, ...refundWithoutId } = refund;
    const updatedRefund = {
      ...refundWithoutId,
      status: type,
    };

    fetch(`http://localhost:8081/api/refundRequests/${refundId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
        Origin: "http://127.0.0.1:5173",
      },
      body: JSON.stringify(updatedRefund),
    });

    // atualiza a lista de refunds e logs
    setTimeout(() => {
      fetchRefundRequests();
      fetchLogs();
    }, 2000);
  };

  const renderRequests = (status) => {
    return refundItemsList
      .filter((item) => item.status === status)
      .map((item) => (
        <RefundItem
          key={item.id}
          value={item.value}
          date={item.date}
          description={item.desc}
          user={item.user}
          status={item.status}
          showActionButtons={props.isAdmin}
          onAccept={() => onUpdateStatusHandler(item.id, item, "ACEITO")}
          onRefuse={() => onUpdateStatusHandler(item.id, item, "RECUSADO")}
        />
      ));
  };

  const renderPendents = renderRequests("PENDENTE");
  const renderAccepted = renderRequests("ACEITO");
  const renderRefused = renderRequests("ACEITO");

  // seta o titulo da janela no navegador
  document.title = props.isAdmin ? "Admin dashboard" : "User dashboard";

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="logout-container">
          <span style={{ fontSize: "18px" }}>
            User type:{" "}
            <span style={{ textDecoration: "underline" }}>
              {props.isAdmin ? "Admin" : "Normal User"}
            </span>
          </span>
          <button onClick={props.onLogout} className="send-request-button">
            Logout
          </button>
        </div>
        {!props.isAdmin && (
          <div className="create-refund-container">
            <p className="section-title" style={{ marginBottom: "8px" }}>
              Create a refund request
            </p>
            <label htmlFor="request-value" style={{ fontSize: "18px" }}>
              RequestValue
            </label>
            <input
              type="number"
              id="request-value"
              ref={newRequestValue}
              style={{ borderRadius: "8px", marginBottom: "8px" }}
            />
            <label htmlFor="create-request" style={{ fontSize: "18px" }}>
              Description
            </label>
            <textarea
              id="create-request"
              className="create-request-input"
              ref={descriptionValue}
            />
            <button
              className="send-request-button"
              onClick={createRequestHandler}
            >
              Send request
            </button>
          </div>
        )}
        <div className="refund-items-container">
          <p className="section-title" style={{ marginTop: "8px" }}>
            Pendent Requests
          </p>
          {renderPendents}
          <p className="section-title" style={{ marginTop: "8px" }}>
            Accepted Requests
          </p>
          {renderAccepted}
          <p className="section-title" style={{ marginTop: "8px" }}>
            Refused Requests
          </p>
          {renderRefused}
        </div>

        <div className="refund-items-container">
          <p className="section-title" style={{ marginTop: "8px" }}>
            Logs
          </p>
          {logsHTML && (
            <div
              className="logs-container"
              dangerouslySetInnerHTML={{ __html: logsHTML }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

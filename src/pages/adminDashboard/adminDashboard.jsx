/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import moment from "moment";
import "./adminDashboard.css";
import { RefundItem } from "../../components/dashboard/refundItem";

export const AdminDashboard = (props) => {
  const [refundItemsList, setRefundItemsList] = useState([]);
  const newRequestValue = useRef();
  const descriptionValue = useRef();

  // Puxa a lista de requests do back
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

  // puxa as informações do usuário do back
  useEffect(() => {}, []);

  const getCurrentDate = () => {
    const currentDate = moment().format("DD/MM/YYYY");
    return currentDate;
  };

  const createRequestHandler = () => {
    const currentDate = getCurrentDate();

    const requestBody = {
      value: newRequestValue.current.value,
      date: currentDate,
      status: "PENDENTE",
      desc: descriptionValue.current.value,
      user: "",
    };

    console.log("ainda nao implementado");
  };

  // O parametro type é uma string que receberá "ACEITO" ou "RECUSADO"
  const onUpdateStatusHandler = (refundId, refund, type) => {
    console.log(refund);
    const { id, ...refundWithoutId } = refund;
    const updatedRefund = {
      ...refundWithoutId,
      status: type,
    };
    console.log(updatedRefund);

    fetch(`http://localhost:8081/api/refundRequests/${refundId}`, {
      method: "PUT",
      headers: {
        Origin: "http://127.0.0.1:5173",
      },
      body: updatedRefund,
    });
  };

  // seta o titulo da janela no navegador
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
            <p>Create a refund request</p>
            <label htmlFor="request-value">RequestValue</label>
            <input type="number" id="request-value" ref={newRequestValue} />
            <label htmlFor="create-request">Description</label>
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
          <p>Pendent Requests</p>
          {refundItemsList
            .filter((item) => item.status === "PENDENTE")
            .map((item) => (
              <RefundItem
                key={item.id}
                value={item.value}
                date={item.date}
                description={item.desc}
                user={item.user}
                status={item.status}
                onAccept={() => onUpdateStatusHandler(item.id, item, "ACEITO")}
                onRefuse={() =>
                  onUpdateStatusHandler(item.id, item, "RECUSADO")
                }
              />
            ))}
          <p>Accepted Requests</p>
          {refundItemsList
            .filter((item) => item.status === "ACEITO")
            .map((item) => (
              <RefundItem
                key={item.id}
                value={item.value}
                date={item.date}
                description={item.desc}
                user={item.user}
                status={item.status}
                onAccept={() => onUpdateStatusHandler(item.id, item, "ACEITO")}
                onRefuse={() =>
                  onUpdateStatusHandler(item.id, item, "RECUSADO")
                }
              />
            ))}
          <p>Refused Requests</p>
          {refundItemsList
            .filter((item) => item.status === "RECUSADO")
            .map((item) => (
              <RefundItem
                key={item.id}
                value={item.value}
                date={item.date}
                description={item.desc}
                user={item.user}
                status={item.status}
                onAccept={() => onUpdateStatusHandler(item.id, item, "ACEITO")}
                onRefuse={() =>
                  onUpdateStatusHandler(item.id, item, "RECUSADO")
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
};

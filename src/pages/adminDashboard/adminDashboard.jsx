/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import moment from 'moment';
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
  useEffect(() => {

  }, []);

  const getCurrentDate = () => {
    const currentDate = moment().format("DD/MM/YYYY");
    return currentDate;
  }

  const createRequestHandler = () => {
    const currentDate = getCurrentDate();

    const requestBody = {
      value: newRequestValue.current.value,
      date: currentDate,
      status: "PENDENTE",
      desc: descriptionValue.current.value,
      user: "",
    };

    console.log('ainda nao implementado')
  };

  // seta o titulo da janela no navegador
  document.title = props.isAdmin ? "Admin dashboard" : "User dashboard";

  // só pra ver alguma coisa no console
  const refHandler = () => {
    console.log(newRequestValue.current.value);
  };

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
            <textarea id="create-request" className="create-request-input" ref={descriptionValue} />
            <button className="send-request-button" onClick={createRequestHandler}>Send request</button>
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
          <button onClick={refHandler}>printRef</button>
        </div>
      </div>
    </div>
  );
};

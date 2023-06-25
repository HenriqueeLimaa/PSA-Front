/* eslint-disable react/prop-types */
import "./refundItem.css";

export const RefundItem = (props) => {
  return (
    <div className="refund-item">
      <div className="refund-item-info">
        <p>Requester id: {props.user}</p>
        <p>Refund value: ${props.value}</p>
        <p>Expanse type: Lorem ipsum</p>
        <p>Request date: {props.date}</p>
        <p>Request status: {props.status}</p>
      </div>
      <div className="refund-description">
        <p>{props.description}</p>
      </div>
      <div className="refund-item-buttons">
        <button style={{ backgroundColor: "rgb(107, 194, 107)" }} onClick={props.onAccept} >
          Accept
        </button>
        <button style={{ backgroundColor: "rgb(142, 48, 48)" }} onClick={props.onRefuse} >Refuse</button>
      </div>
    </div>
  );
};

import "./refundItem.css";

export const RefundItem = () => {
  return (
    <div className="refund-item">
      <div className="refund-item-info">
        <p>Requester name: Igor</p>
        <p>Refund value: $396</p>
        <p>Expanse type: Lorem ipsum</p>
        <p>Request date: 19/06/2022</p>
      </div>
      <div className="refund-description">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="refund-item-buttons">
        <button style={{backgroundColor: 'rgb(107, 194, 107)'}}>Accept</button>
        <button style={{backgroundColor: 'rgb(142, 48, 48)'}}>Refuse</button>
      </div>
    </div>
  );
};

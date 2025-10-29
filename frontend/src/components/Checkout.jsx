import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const selectedProducts = location.state?.selectedProducts || [];

  const handlePay = () => {
    setShowPopup(true);
  };

  const handleDismiss = () => {
    setShowPopup(false);
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2>Checkout</h2>
      {selectedProducts.length === 0 ? (
        <p>No products selected.</p>
      ) : (
        <ul>
          {selectedProducts.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      )}
      <button onClick={handlePay} style={styles.button}>Pay</button>

      {showPopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h3>Payment Processed!</h3>
            <button onClick={handleDismiss}>Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  button: { marginTop: "20px", padding: "10px 20px", fontSize: "16px" },
  popup: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  popupContent: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center"
  }
};

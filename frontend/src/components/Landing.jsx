import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Welcome to the Store</h1>
      <button onClick={() => navigate("/products")} style={styles.button}>
        Peruse the Goods
      </button>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  button: { padding: "10px 20px", fontSize: "16px", cursor: "pointer" }
};

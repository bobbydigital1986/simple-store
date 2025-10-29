import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleToggle = (id) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckout = () => {
    const selectedProducts = products.filter(p => selected[p.id]);
    navigate("/checkout", { state: { selectedProducts } });
  };

  return (
    <div style={styles.container}>
      <h2>Our Fine Selection</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map(p => (
          <li key={p.id}>
            <label>
              <input
                type="checkbox"
                checked={!!selected[p.id]}
                onChange={() => handleToggle(p.id)}
              />{" "}
              {p.name}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout} style={styles.button}>
        Checkout
      </button>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  button: { marginTop: "20px", padding: "10px 20px", fontSize: "16px" }
};

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState({});
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();
  const ldClient = useLDClient();
  
  // Get feature flags
  const {
    enableSorting,     // Flag to enable product sorting
    showPrices,        // Flag to show product prices
    enableBulkSelect   // Flag to enable select all/none
  } = useFlags();

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        // Track that products were loaded
        ldClient?.track("products_loaded", { count: data.length });
      });
  }, [ldClient]);

  const handleToggle = (id) => {
    setSelected(prev => {
      const newSelected = { ...prev, [id]: !prev[id] };
      // Track product selection with LaunchDarkly
      ldClient?.track("product_selected", { 
        productId: id,
        selected: newSelected[id]
      });
      return newSelected;
    });
  };

  const handleCheckout = () => {
    const selectedProducts = products.filter(p => selected[p.id]);
    // Track checkout with LaunchDarkly
    ldClient?.track("checkout_started", { 
      itemCount: selectedProducts.length,
      items: selectedProducts.map(p => p.id)
    });
    navigate("/checkout", { state: { selectedProducts } });
  };

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    ldClient?.track("products_sorted", { order: newOrder });
  };

  const handleBulkSelect = (selectAll) => {
    const newSelected = {};
    products.forEach(p => newSelected[p.id] = selectAll);
    setSelected(newSelected);
    ldClient?.track("bulk_selection", { selectAll });
  };

  // Sort products if sorting is enabled
  const displayProducts = [...products];
  if (enableSorting) {
    displayProducts.sort((a, b) => {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }

  return (
    <div style={styles.container}>
      <h2>Our Fine Selection</h2>
      
      {/* Sorting controls - only show if enabled by flag */}
      {enableSorting && (
        <div style={styles.controls}>
          <button onClick={handleSort} style={styles.controlButton}>
            Sort {sortOrder === 'asc' ? '↓' : '↑'}
          </button>
        </div>
      )}

      {/* Bulk selection controls - only show if enabled by flag */}
      {enableBulkSelect && (
        <div style={styles.controls}>
          <button onClick={() => handleBulkSelect(true)} style={styles.controlButton}>
            Select All
          </button>
          <button onClick={() => handleBulkSelect(false)} style={styles.controlButton}>
            Clear All
          </button>
        </div>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {displayProducts.map(p => (
          <li key={p.id} style={styles.productItem}>
            <label style={styles.productLabel}>
              <input
                type="checkbox"
                checked={!!selected[p.id]}
                onChange={() => handleToggle(p.id)}
              />
              <span style={styles.productName}>{p.name}</span>
              {/* Show price if enabled by flag */}
              {showPrices && (
                <span style={styles.price}>${p.price || '0.00'}</span>
              )}
            </label>
          </li>
        ))}
      </ul>

      <button 
        onClick={handleCheckout} 
        style={styles.button}
        disabled={!Object.values(selected).some(Boolean)}
      >
        Checkout ({Object.values(selected).filter(Boolean).length} items)
      </button>
    </div>
  );
}

const styles = {
  container: { 
    textAlign: "center", 
    marginTop: "50px",
    maxWidth: "600px",
    margin: "50px auto",
    padding: "0 20px"
  },
  controls: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
    justifyContent: "center"
  },
  controlButton: {
    padding: "5px 10px",
    fontSize: "14px"
  },
  productItem: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#f5f5f5"
  },
  productLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  productName: {
    flex: 1,
    textAlign: "left"
  },
  price: {
    color: "#666",
    fontWeight: "bold"
  },
  button: { 
    marginTop: "20px", 
    padding: "10px 20px", 
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

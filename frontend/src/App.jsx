import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing.jsx";
import Products from "./components/Products.jsx";
import Checkout from "./components/Checkout.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}


// export default function App() {
//   return <h1>Hello world — React is running</h1>;
// }
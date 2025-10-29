import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import Landing from "./components/Landing.jsx";
import Products from "./components/Products.jsx";
import Checkout from "./components/Checkout.jsx";

export default function App() {
  const { devTestFlag } = useFlags(); // Add your feature flags here
  const ldClient = useLDClient();

  useEffect(() => {
    // Example of tracking an event when the app loads
    ldClient?.track("app_loaded", { timestamp: Date.now() });
  }, [ldClient]);

  // You can use feature flags in your JSX like this:
  // {devTestFlag && <div>This is a test feature</div>}

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



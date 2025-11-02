import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import Landing from "./components/Landing.jsx";
import Products from "./components/Products.jsx";
import Checkout from "./components/Checkout.jsx";

export default function App() {
  const { devTestFlag } = useFlags();
  const ldClient = useLDClient();
  
  const [userRegion, setUserRegion] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // generate a fake email
  useEffect(() => {
    const emails = [
      "alice@example.com",
      "bob@example.com",
      "charlie@example.com",
      "derek@example.com",
      "eleanor@example.com",
      "fred@example.com",
      "greg@example.com",
      "henry@example.com",
      "ivan@example.com",
      "jake@example.com",
      "kevin@example.com",
      "laura@example.com",
      "mark@example.com",
      "nelly@example.com"
    ];
    const randomIndex = Math.floor(Math.random() * emails.length);
    setUserEmail(emails[randomIndex]);
  }, []); 

  // fetch actual region
  useEffect(() => {
    const getUserRegion = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        // console.log('Region detected:', data.region);
        setUserRegion(data.region);
      } catch (error) {
        console.error('Failed to fetch region:', error);
        setUserRegion('unknown');
      }
    };
    getUserRegion();
  }, []);

  // set context once all metadata are ready
  useEffect(() => {
    console.log("User", userEmail)
    if (ldClient && userEmail && userRegion) {
      const newContext = {
        kind: "multi",
        user: {
          key: userEmail,
          email: userEmail
        },
        device: {
          key: `region-${userRegion}`,
          region: userRegion
        }
      };

      // console.log('Updating LD context:', newContext);
      
      ldClient.identify(newContext, null, () => {
        // console.log("New context's flags available");
      });
    }
  }, [ldClient, userEmail, userRegion]);

  // track when app loads up
  useEffect(() => {
    if (ldClient) {
      ldClient.track("app_loaded", { timestamp: Date.now() });
    }
  }, [ldClient]);



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



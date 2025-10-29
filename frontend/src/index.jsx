import React from "react";
import ReactDOM from "react-dom/client";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import App from "./App.jsx";
import "./index.css";

// Initialize LaunchDarkly asynchronously
(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: "69028e023e78d10a8301ad2c", // Replace with your actual client-side ID
    context: {
      kind: "user",
      key: "user-key-123abcde",
      name: "Sample User",
      email: "biz@face.dev"
    }
  });

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <LDProvider>
      <App />
    </LDProvider>
  );
})();

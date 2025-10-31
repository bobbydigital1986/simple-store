import React from "react";
import ReactDOM from "react-dom/client";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import App from "./App.jsx";
import "./index.css";



(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: "69028e023e78d10a8301ad2c"
  });

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <LDProvider>
      <App />
    </LDProvider>
  );
})();

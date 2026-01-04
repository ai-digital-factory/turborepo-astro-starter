import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/styles/globals.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  const errorMessage =
    "Failed to find the root element. Make sure there is an element with id 'root' in your HTML.";
  console.error(errorMessage);
  throw new Error(errorMessage);
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

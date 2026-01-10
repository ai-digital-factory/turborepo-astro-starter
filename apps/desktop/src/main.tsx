import React from "react";
import ReactDOM from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "@/App";
import ErrorBoundary from "@/components/ErrorBoundary";
import "@/styles/globals.css";

const convexUrl = import.meta.env.VITE_CONVEX_URL;

if (!convexUrl) {
  const errorMessage =
    "VITE_CONVEX_URL is not defined or empty. Please check your environment variables (e.g., .env file) and ensure it's set correctly for Convex.";
  console.error(errorMessage);
  throw new Error(errorMessage);
}

const convex = new ConvexReactClient(convexUrl);

const rootElement = document.getElementById("root");

if (!rootElement) {
  const errorMessage =
    "Failed to find the root element. Make sure there is an element with id 'root' in your HTML.";
  console.error(errorMessage);
  throw new Error(errorMessage);
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ConvexProvider>
  </React.StrictMode>,
);

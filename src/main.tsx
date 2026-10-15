import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

/* Design system, in cascade order: tokens → base element styles → components
   → page-level compositions. */
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/pages.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element #root was not found in index.html");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

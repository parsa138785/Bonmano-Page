import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Bonmano } from "./screens/Bonmano";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Bonmano />
  </StrictMode>,
); 
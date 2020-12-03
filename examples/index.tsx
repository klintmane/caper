import { StrictMode } from "react";
import { render } from "react-dom";

import App from "./App";
import DevTools from "./DevTools";

render(
  <StrictMode>
    <App />
    <DevTools />
  </StrictMode>,
  document.getElementById("root")!
);

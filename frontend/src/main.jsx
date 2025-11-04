import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ModeSelectionPage from "./pages/ModeSelectionPage.jsx";
import VisualizerPage from "./pages/VisualizerPage.jsx";
import PredictorPage from "./pages/PredictorPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ModeSelectionPage />} />
          <Route path="visualize" element={<VisualizerPage />} />
          <Route path="predict" element={<PredictorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

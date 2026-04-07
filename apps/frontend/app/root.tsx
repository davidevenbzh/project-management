import "./app.css";

import { Navigate, Route, Routes } from "react-router";

import Home from "./routes/home";
import { AppThemeProvider } from "./theme/AppThemeProvider";

export default function App() {
  return (
    <div className="theme-root" data-theme="dark">
      <AppThemeProvider mode="dark">
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AppThemeProvider>
    </div>
  );
}

import "./app.css";

import { Navigate, Route, Routes } from "react-router";

import ForgotPasswordRoute from "./routes/forgot-password";
import Home from "./routes/home";
import RegistrationRoute from "./routes/registration";
import { AppThemeProvider } from "./theme/AppThemeProvider";

export default function App() {
  return (
    <div className="theme-root" data-theme="dark">
      <AppThemeProvider mode="dark">
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forgot-password" element={<ForgotPasswordRoute />} />
            <Route path="/registration" element={<RegistrationRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AppThemeProvider>
    </div>
  );
}

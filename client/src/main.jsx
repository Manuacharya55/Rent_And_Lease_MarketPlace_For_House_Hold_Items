import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/Auth.jsx";
import { UserProvider } from "./context/Profile.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UserProvider>
      <Toaster />
      <App />
    </UserProvider>
  </AuthProvider>
);

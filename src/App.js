import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Write from "./components/Write";
import Read from "./components/Read";
import UpdateRead from "./components/UpdateRead";
import UpdateWrite from "./components/UpdateWrite";
import AppLayout from "./components/layout/AppLayout";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const storedPreference = window.localStorage.getItem("fruit-inventory:dark");
    if (storedPreference !== null) {
      return storedPreference === "true";
    }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem("fruit-inventory:dark", String(isDarkMode));
  }, [isDarkMode]);

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "rounded-2xl bg-white/90 text-slate-900 shadow-soft backdrop-blur dark:bg-slate-900/90 dark:text-slate-100",
          style: { padding: "14px 16px" },
          success: {
            iconTheme: {
              primary: "#14b8a6",
              secondary: "#ecfeff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fee2e2",
            },
          },
        }}
      />
      <Routes>
        <Route
          element={
            <AppLayout
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
            />
          }
        >
          <Route path="/" element={<Write />} />
          <Route path="/write" element={<Write />} />
          <Route path="/read" element={<Read />} />
          <Route path="/updateread" element={<UpdateRead />} />
          <Route path="/updatewrite/:firebaseId" element={<UpdateWrite />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
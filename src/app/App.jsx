import { AppRoutes } from "../app/router/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--secondary)]">

      {/* TOASTS */}
      <Toaster
        position="top-center"
        gutter={10}
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "Segoe UI, sans-serif",
            fontWeight: 500,
            fontSize: "0.9rem",
            borderRadius: "12px",
            padding: "12px 16px",
            backdropFilter: "blur(6px)",
          },
          success: {
            style: {
              background: "#F5F5DC",
              color: "#2C1506",
              border: "1px solid #7F3C09",
            },
          },
          error: {
            style: {
              background: "#440F0F",
              color: "#F5F5DC",
            },
          },
        }}
      />

      {/* CONTENIDO */}
      <div className="animate-fadeIn">
        <AppRoutes />
      </div>

    </div>
  );
}

export default App;
import { toast } from 'react-hot-toast';

// Detectar si el dispositivo es móvil de forma dinámica al cargar el módulo
const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

const baseStyle = {
    borderRadius: '12px', // Bordes más suaves acordes a la estética móvil actual
    fontWeight: 600,
    fontFamily: 'inherit',
    fontSize: isMobile ? '0.875rem' : '1rem', // 14px en móvil, 16px en escritorio
    padding: isMobile ? '12px 16px' : '16px 24px', // Dimensiones compactas en móvil
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
    maxWidth: isMobile ? '90vw' : '450px', // Previene que el toast toque o desborde los bordes de la pantalla
    margin: isMobile ? '0 auto' : 'inherit'
};

export const showSuccess = (message) =>
  toast.success(message, {
    style: {
      ...baseStyle,
      background: "linear-gradient(90deg, #22c55e 0%, #16a34a 100%)",
      color: "#fff",
      border: "1px solid #16a34a",
    },
    iconTheme: {
      primary: "#ffffff",
      secondary: "#16a34a", // Invertido para mejor contraste visual
    },
  });
 
export const showError = (message) =>
  toast.error(message, {
    style: {
      ...baseStyle,
      background: "linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)",
      color: "#fff",
      border: "1px solid #b91c1c",
    },
    iconTheme: {
      primary: "#ffffff",
      secondary: "#b91c1c", // Invertido para mejor contraste visual
    },
  });
 
export const showInfo = (message) =>
  toast(message, {
    style: {
      ...baseStyle,
      background: "linear-gradient(90deg, #0ea5e9 0%, #0369a1 100%)",
      color: "#fff",
      border: "1px solid #0369a1",
    },
    iconTheme: {
      primary: "#ffffff",
      secondary: "#0369a1", // Invertido para mejor contraste visual
    },
  });
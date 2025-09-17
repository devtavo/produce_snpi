import React, { useContext } from "react";
import { FaUserLock } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

const LoginPanel = ({ isOpen, onToggle }) => {
  const { handleLogin } = useContext(UserContext);

  const redirectToLoginUnico = () => {
    // Simular redirección directa al login único
    console.log("Redirigiendo directamente al login único...");
    
    alert("Redirigiendo al sistema de login único...");
    
    setTimeout(() => {
      handleLogin("usuario_autenticado", "password_simulado");
      
      console.log("Sesión iniciada exitosamente mediante login único");
      alert("¡Sesión iniciada exitosamente mediante login único!");
      
    }, 1000); 
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "110px",
        left: 0,
        height: "calc(100% - 110px)",
        zIndex: 100,
        pointerEvents: "auto",
      }}
    >
      <div
        onClick={redirectToLoginUnico}
        style={{
          position: "absolute",
          top: "60%",
          left: 0,
          transform: "translateY(-50%)",
          width: "40px",
          height: "40px",
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
          borderRadius: "0 8px 8px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          pointerEvents: "auto",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.6)"}
        onMouseOut={(e) => e.target.style.backgroundColor = "rgba(0, 0, 0, 0.4)"}
      >
        <FaUserLock color="#fff" />
      </div>
    </div>
  );
};

export default LoginPanel;

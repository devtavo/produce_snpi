import React from "react";
import logoCentral from "../assets/logo_central.jpg";
import logoMinisterio from "../assets/logo_ministerio.png";
import logoPndp from "../assets/logo_pndp.png";

const Header = () => {
  return (
    <div
      style={{
        height: "75px",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        background: "#d32f2f",
        backdropFilter: "blur(8px)",
        color: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 2000,
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <img src={logoMinisterio} alt="Logo Ministerio" style={{ height: "60px" }} />
      <span style={{ fontSize: "23px", fontWeight: "bold", margin: "0 10px" }}>
        MAPA INTERACTIVO DE COMERCIO INTERNO E INDUSTRIA
      </span>
      {/* <img src={logoCentral} alt="Logo Central" style={{ height: "60px" }} /> */}
      <img src={logoPndp} alt="Logo PNDP" style={{ height: "60px" }} />
    </div>
  );
};

export default Header;
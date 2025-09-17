import { FaStore, FaLandmark, FaIndustry, FaMapPin, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const iconoCapa = (capa) => {
  switch (capa) {
    case 0:
      return <FaStore color="#fff" />;
    case 1:
      return <FaLandmark color="#fff" />;
    case 2:
      return <FaIndustry color="#fff" />;
    case 3:
      return <FaMapPin color="#fff" />;
    default:
      return null;
  }
};

const HeaderAbove = ({activeTab, setActiveTab }) => {
  const { authenticated, handleLogout } = useContext(UserContext);

  const tabs = [
    "Mercados de abastos minoristas",
    "Mercados de abastos mayoristas",
    "Parques industriales",
    "Zonas industriales",
  ];

  return (
    <header
      style={{
        position: "absolute",
        top: "75px",
        left: 0,
        right: 0,
        height: "50px",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        background: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        zIndex: 1900,
        color: "#fff",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "2px" }}
        >
          MICI
        </div>
        <div style={{ fontSize: "12px", lineHeight: "14px" }}>
          Mapa interactivo de <br />
          Comercio Interno e Industria
        </div>
      </div>
      <div style={{display: "flex", alignItems: "center",flexDirection: "row" ,gap: "20px",height: "100%"}}>
      <nav style={{ display: "flex", height: "100%" }}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 15px",
              cursor: "pointer",
              position: "relative",
              fontSize: "15px",
              fontWeight: 500,
              color: "#fff",
              transition: "color 0.3s ease",
            }}
          >
            {iconoCapa(index)}
            <span>&nbsp;&nbsp;</span>
            {tab}
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "4px",
                width: activeTab === index ? "100%" : "0%",
                backgroundColor: "#b71c1c",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        ))}
      </nav>

      {/* Logout Button - Only shows when authenticated */}
      {authenticated && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={handleLogout}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "12px",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
              e.target.style.borderColor = "rgba(255,255,255,0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "rgba(255,255,255,0.1)";
              e.target.style.borderColor = "rgba(255,255,255,0.3)";
            }}
          >
            <FaSignOutAlt size={12} />
            Salir
          </button>
        </div>
      )}
      </div>
    </header>
  );
};

export default HeaderAbove;

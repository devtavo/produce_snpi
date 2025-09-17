import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import SelectComponent from "./SelectComponent";

const BuscarPanel = ({ isOpen, onToggle, onSearchChange, activeTab }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [marketSearch, setMarketSearch] = useState("");

  const departmentOptions = [
    { value: 1, label: "Lima" },
    { value: 2, label: "Arequipa" },
    { value: 3, label: "Cusco" },
    { value: 4, label: "Piura" },
    { value: 5, label: "La Libertad" },
  ];

  const provinceOptions = [
    { value: 1, label: "Lima" },
    { value: 2, label: "Callao" },
    { value: 3, label: "Huaura" },
    { value: 4, label: "Cañete" },
  ];

  const districtOptions = [
    { value: 1, label: "Lima" },
    { value: 2, label: "Miraflores" },
    { value: 3, label: "San Isidro" },
    { value: 4, label: "Barranco" },
  ];

  const handleSearch = async () => {
    try {
      let dataModule;

      switch (activeTab) {
        case 0: // Minoristas
          dataModule = await import("../data/intervenciones_real_minorista");
          break;
        case 1: // Mayoristas
          dataModule = await import("../data/intervenciones_real_mayorista");
          break;
        case 2: // Parques industriales
          dataModule = await import("../data/parques_industriales");
          break;
        case 3: // Zonas industriales
          dataModule = await import("../data/zonas_industriales");
          break;
        default:
          dataModule = await import("../data/intervenciones_real_minorista");
      }

      const data = dataModule.default || dataModule;
      
      const filteredData = data.filter((item) => {
        if (searchTerm && !item.nombre?.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        
        if (selectedDepartment.length > 0 && !selectedDepartment.includes(item.departamento_id)) {
          return false;
        }
        
        if (selectedProvince.length > 0 && !selectedProvince.includes(item.provincia_id)) {
          return false;
        }
        
        if (selectedDistrict.length > 0 && !selectedDistrict.includes(item.distrito_id)) {
          return false;
        }
        
        if (marketSearch && !item.nombre?.toLowerCase().includes(marketSearch.toLowerCase())) {
          return false;
        }
        
        return true;
      });

      console.log(`Datos encontrados en búsqueda:`, filteredData.length, "registros");
      
      onSearchChange(filteredData);
    } catch (error) {
      console.error("Error al realizar búsqueda:", error);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedDepartment([]);
    setSelectedProvince([]);
    setSelectedDistrict([]);
    setMarketSearch("");
  };

  return (
     <div
      style={{
        position: "absolute",
        top: "110px",
        left: 0,
        height: "calc(100% - 110px)",
        zIndex: isOpen ? 100 : 90,
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      <div
        onClick={onToggle}
        style={{
          position: "absolute",
          top: "55%",
          left: isOpen ? "300px" : 0,
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
          transition: "left 0.3s ease",
        }}
      >
        {isOpen ? <FaTimes color="#fff" /> : <FaSearch color="#fff" />}
      </div>

      {/* Panel lateral de búsqueda */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: isOpen ? 0 : "-300px",
          width: "300px",
          height: "100%",
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(8px)",
          borderRight: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "rgba(0, 0, 0, 0.2) 5px 0 5px",
          padding: "15px",
          transition: "left 0.3s ease, opacity 0.3s ease",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          overflowY: "auto",
          color: "#fff",
        }}
      >
        <h3 style={{ marginBottom: "20px", textAlign: "center" }}>Buscar</h3>

        {/* Campo de búsqueda general */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
            Buscar
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ingrese término de búsqueda..."
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "4px",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          />
        </div>

        {/* Selector de Departamento */}
        <div style={{ marginBottom: "15px" }}>
          <SelectComponent
            label="Departamento"
            value={selectedDepartment}
            onChange={setSelectedDepartment}
            options={departmentOptions}
            multiple={false}
            placeholder="Seleccione departamento"
          />
        </div>

        {/* Selector de Provincia */}
        <div style={{ marginBottom: "15px" }}>
          <SelectComponent
            label="Provincia"
            value={selectedProvince}
            onChange={setSelectedProvince}
            options={provinceOptions}
            multiple={false}
            placeholder="Seleccione provincia"
          />
        </div>

        {/* Selector de Distrito */}
        <div style={{ marginBottom: "15px" }}>
          <SelectComponent
            label="Distrito"
            value={selectedDistrict}
            onChange={setSelectedDistrict}
            options={districtOptions}
            multiple={false}
            placeholder="Seleccione distrito"
          />
        </div>

        {/* Búsqueda de Mercados */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
            Buscar Mercados
          </label>
          <input
            type="text"
            value={marketSearch}
            onChange={(e) => setMarketSearch(e.target.value)}
            placeholder="Buscar mercados..."
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "4px",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          />
        </div>

        {/* Botones de acción */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "#b71c1c",
              color: "#fff",
              padding: "8px 12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Buscar
          </button>
          <button
            onClick={handleClear}
            style={{
              backgroundColor: "#666",
              color: "#fff",
              padding: "8px 12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuscarPanel;

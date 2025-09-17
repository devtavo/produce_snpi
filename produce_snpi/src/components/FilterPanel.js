import React, { useState, useEffect } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { filterConfig } from "../utils/filterConfig";
import { toSentenceCase } from "../utils/formatters";
import SelectComponent from "./SelectComponent";

const FilterPanel = ({ isOpen, activeTab, onToggle, onFilterChange }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const tabMapping = {
    0: "mercadosMinoristas", // Minoristas
    1: "mercadosMayoristas", // Mayoristas
    2: "parquesIndustriales", // Parques industriales
    3: "zonasIndustriales", // Zonas industriales
  };
  const currentConfigKey = tabMapping[activeTab];
  const currentConfig = filterConfig[currentConfigKey] || {};

  useEffect(() => {
    let initialFilters = {};

    switch (activeTab) {
      case 0:
        // For minoristas, use the correct field name from config
        if (currentConfig.tipo && currentConfig.tipo.length > 0 && currentConfig.tipo[0].clave) {
          initialFilters[currentConfig.tipo[0].clave] = [1];
        } else {
          initialFilters.tipo = [1];
        }
        break;
      case 1:
        // For mayoristas, use the correct field name from config
        if (currentConfig.tipo && currentConfig.tipo.length > 0 && currentConfig.tipo[0].clave) {
          initialFilters[currentConfig.tipo[0].clave] = [3];
        } else {
          initialFilters.tipo = [3];
        }
        break;
      case 2:
        // For parques industriales, use the correct field name from config
        if (currentConfig.tipo && currentConfig.tipo.length > 0 && currentConfig.tipo[0].clave) {
          initialFilters[currentConfig.tipo[0].clave] = [1];
        } else {
          initialFilters.tipo = [1];
        }
        break;
      case 3:
        // For zonas industriales, use the correct field name from config
        if (currentConfig.tipo && currentConfig.tipo.length > 0 && currentConfig.tipo[0].clave) {
          initialFilters[currentConfig.tipo[0].clave] = [2];
        } else {
          initialFilters.tipo = [2];
        }
        break;
      default:
        break;
    }
    setFilters(initialFilters);
  }, [activeTab, currentConfig]);

  const handleChange = (field, value) => {
    console.log(`Cambiando filtro: ${field} a ${value}`);
    
    const fieldConfig = currentConfig[field];
    let fieldName = field; 
    
    if (fieldConfig && fieldConfig.length > 0 && fieldConfig[0].clave) {
      fieldName = fieldConfig[0].clave;
    }
    
    const newFilters = { ...filters, [fieldName]: value };
    setFilters(newFilters);
  };

  const handleApplyFilters = async () => {
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
      console.log(`filtros aplicados:`, filters);
      
      // Aplica los filtros
      const filteredData = data.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            const fieldConfig = currentConfig[key];
            let fieldName = key; 
            
            if (fieldConfig && fieldConfig.length > 0 && fieldConfig[0].clave) {
              fieldName = fieldConfig[0].clave;
            }
            
            if (typeof item[fieldName] === "number") {
              return value.includes(item[fieldName]);
            }
            const numericValue = Number(item[fieldName]);
            if (!isNaN(numericValue)) {
              return value.includes(numericValue);
            }
            if (typeof item[fieldName] === "string") {
              return value.includes(item[fieldName]);
            }
            return false;
          }
          return true;
        });
      });

      console.log(
        `Datos filtrados para tab ${activeTab}:`,
        filteredData.length,
        "registros"
      );
      onFilterChange(filteredData);
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "125px",
        left: 0,
        height: "calc(100% - 125px)",
        zIndex: isOpen ? 100 : 90,
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      <div
        onClick={onToggle}
        style={{
          position: "absolute",
          top: "50%",
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
        {isOpen ? <FaTimes color="#fff" /> : <FaFilter color="#fff" />}
      </div>

      {/* Panel lateral */}
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
        {Object.entries(currentConfig).map(([key, options]) => {
          // Get the correct field name for this filter
          const fieldConfig = currentConfig[key];
          let fieldName = key;
          
          if (fieldConfig && fieldConfig.length > 0 && fieldConfig[0].clave) {
            fieldName = fieldConfig[0].clave;
          }
          
          return (
            <div key={key} style={{ marginBottom: "10px" }}>
              <SelectComponent
                label={toSentenceCase(key, ["SNPI"])}
                value={filters[fieldName] || []}
                onChange={(value) => handleChange(key, value)}
                options={options}
                multiple
                placeholder={`Selecciona ${key}`}
              />
            </div>
          );
        })}
        <button
          onClick={() => handleApplyFilters()}
          style={{
            backgroundColor: "#b71c1c",
            color: "#fff",
            padding: "8px 12px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "15px",
            width: "100%",
          }}
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;

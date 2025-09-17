import React, { useState,useEffect } from "react";
import MapWithOutSidebar from "../components/MapWithOutSidebar";
import Header from "../components/Header";
import HeaderAbove from "../components/HeaderAbove";
import FilterPanel from "../components/FilterPanel";
import BuscarPanel from "../components/BuscarPanel";
import LoginPanel from "../components/LoginPanel";
// import RightPanel from "../components/RightPanel";

const Map = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBuscarOpen, setIsBuscarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    console.log("activeTab ha cambiado, reseteando datos filtrados");
    setFilteredData(null); 
  }, [activeTab]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    if (!isFilterOpen) {
      setIsBuscarOpen(false);
    }
  };

  const toggleBuscar = () => {
    setIsBuscarOpen(!isBuscarOpen);
    if (!isBuscarOpen) {
      setIsFilterOpen(false);
    }
  };

  const handleFilterChange = (filteredData) => {
    console.log("Datos filtrados recibidos:", filteredData);
    setFilteredData(filteredData);
  };

  const handleSearchChange = (filteredData) => {
    console.log("Datos filtrados recibidos de búsqueda:", filteredData);
    setFilteredData(filteredData);
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <MapWithOutSidebar filteredData={filteredData} activeTab={activeTab} />
      </div>
      <Header />
      <HeaderAbove activeTab={activeTab} setActiveTab={setActiveTab} />
      {(
        <FilterPanel
          isOpen={isFilterOpen}
          activeTab={activeTab}
          onToggle={toggleFilter}
          onFilterChange={handleFilterChange}
        />
      )}
      {(
        <BuscarPanel
          isOpen={isBuscarOpen}
          onToggle={toggleBuscar}
          onSearchChange={handleSearchChange}
        />
      )}
      <LoginPanel />
    </div>
  );
};

export default Map;

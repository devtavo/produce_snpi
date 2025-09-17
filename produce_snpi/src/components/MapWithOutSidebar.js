import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayersControl,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "./MapWithSidebar.css";
import { icons } from "../utils/icons";
import RightPanel from "./RightPanel";
import Legend from "./Legend";
import ArcGISFeatureLayer from "./ArcGISFeatureLayer";
// import RightPanelMUI from "./RightPanelMUI";

const { BaseLayer,Overlay } = LayersControl;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapWithOutSidebar = ({ filteredData, activeTab }) => {
  const [activeLayer, setActiveLayer] = useState("mercados");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filtros, setFiltros] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [defaultData, setDefaultData] = useState([]);

  useEffect(() => {
    const loadDefaultData = async () => {
      try {
        let dataModule;

        switch (activeTab) {
          case 0: // Minoristas
            dataModule = await import("../data/intervenciones_real_minorista");
            console.log("Datos por defecto cargados para Minoristas");
            break;
          case 1: // Mayoristas
            dataModule = await import("../data/intervenciones_real_mayorista");
            console.log("Datos por defecto cargados para Mayoristas");
            break;
          case 2: // Parques industriales
            dataModule = await import("../data/parques_industriales");
            console.log("Datos por defecto cargados para Parques Industriales");
            break;
          case 3: // Zonas industriales
            dataModule = await import("../data/zonas_industriales");
            console.log("Datos por defecto cargados para Zonas Industriales");
            break;
          default:
            dataModule = await import("../data/intervenciones_real_minorista");
            console.log("Datos por defecto cargados defecto");
            break;
        }

        const data = dataModule.default || dataModule;
        setDefaultData(data);
      } catch (error) {
        console.error("Error al cargar datos por defecto:", error);
      }
    };

    loadDefaultData();
  }, [activeTab]);

  const handleMarkerClick = (item) => {
    setSelectedItem(item);
    setSidebarOpen(true);
  };

  return (
    <div className="map-layout">
      {/* Mapa */}
      <div className="map-container">
        <MapContainer
          center={[-9.19, -75.0152]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Capa base de OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LayersControl position="topright">
            {/* Capa base de OpenStreetMap */}
            <BaseLayer name="OSM Maps">
              <TileLayer
                name="OpenStreetMap"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>
            <BaseLayer name="OSM Curvas de nivel">
              <TileLayer
                name="OpenStreetMap"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>
            <BaseLayer checked name="Google Maps Satelital">
              <TileLayer
                name="Google Maps Satelital"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
              />
            </BaseLayer>
            <BaseLayer checked name="Google Maps Satelital">
              <TileLayer
                name="Google Maps Satelital"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
              />
            </BaseLayer>
            <Overlay name="Departamentos PRODUCE">
              <WMSTileLayer
                url="http://78.46.16.8:8080/geoserver/colaboraccion/wms"
                layers="colaboraccion:departamentos_produce"
                format="image/png"
                transparent={true}
                version="1.1.0"
              />
            </Overlay>
            <Overlay name="Provincias PRODUCE">
              <WMSTileLayer
                url="http://78.46.16.8:8080/geoserver/colaboraccion/wms"
                layers="colaboraccion:provincias_produce"
                format="image/png"
                transparent={true}
                version="1.1.0"
              />
            </Overlay>
            <Overlay name="Distritos PRODUCE">
              <WMSTileLayer
                url="http://78.46.16.8:8080/geoserver/colaboraccion/wms"
                layers="colaboraccion:distritos_produce"
                format="image/png"
                transparent={true}
                version="1.1.0"
              />
            </Overlay>
            {activeTab === 3 && (
              <BaseLayer name="Parques Industriales">
                <ArcGISFeatureLayer
                  url="http://sigeo.produce.gob.pe:6080/arcgis/rest/services/zonas_industriales/zonas_industriales_prueba/MapServer"
                  layerId={[0, 1]}
                  style={{
                    color: "#5900ffff",
                    weight: 2,
                    opacity: 0.8,
                    fillColor: "#ffee00ff",
                    fillOpacity: 0.2,
                  }}
                  popupTemplate={(feature) => {
                    const props = feature.properties || {};
                    return `
                      <div style="max-width: 300px;">
                        <h4 style="margin: 0 0 8px 0; color: #333;">${
                          props.NOMBRE || "Parque Industrial"
                        }</h4>
                        <hr style="margin: 8px 0;">
                        ${
                          props.OBJECTID
                            ? `<p style="margin: 4px 0;"><strong>ID:</strong> ${props.OBJECTID}</p>`
                            : ""
                        }
                        ${
                          props.DESCRIPCION
                            ? `<p style="margin: 4px 0;"><strong>Descripción:</strong> ${props.DESCRIPCION}</p>`
                            : ""
                        }
                        ${
                          props.UBICACION
                            ? `<p style="margin: 4px 0;"><strong>Ubicación:</strong> ${props.UBICACION}</p>`
                            : ""
                        }
                        ${
                          props.AREA
                            ? `<p style="margin: 4px 0;"><strong>Área:</strong> ${props.AREA} ha</p>`
                            : ""
                        }
                        ${
                          props.ESTADO
                            ? `<p style="margin: 4px 0;"><strong>Estado:</strong> ${props.ESTADO}</p>`
                            : ""
                        }
                      </div>
                    `;
                  }}
                  onLayerLoad={(layer) => {
                    console.log(
                      "Capa de Parques Industriales cargada exitosamente"
                    );
                    setActiveLayer("parquesIndustriales");
                  }}
                  onLayerError={(error) => {
                    console.error(
                      "Error al cargar capa de Parques Industriales:",
                      error
                    );
                  }}
                />
              </BaseLayer>
            )}
          </LayersControl>
          {(Array.isArray(filteredData) ? filteredData : defaultData).map(
            (item) => (
              <Marker
                key={item.id || Math.random()}
                position={[item.latitud, item.longitud]}
                icon={icons[item.tipo] || icons.default}
                eventHandlers={{
                  click: () => handleMarkerClick(item),
                }}
              >
                <Popup>{item.nombre}</Popup>
              </Marker>
            )
          )}
        </MapContainer>
      </div>
      <RightPanel
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        selectedItem={selectedItem}
      />

      {/* Leyenda */}
      <Legend />
    </div>
  );
};

export default MapWithOutSidebar;

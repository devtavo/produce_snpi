import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import * as EL from "esri-leaflet";

const ArcGISFeatureLayer = ({ 
  url, 
  where="1=1", 
  layerId = 0, 
  style = { color: "#3388ff", weight: 2 },
  popupTemplate = (feature) => `<b>${feature.properties.NOMBRE}</b><br/>ID: ${feature.properties.OBJECTID}`,
  onLayerLoad,
  onLayerError 
}) => {
  const map = useMap();
  const [layers, setLayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setError("URL no proporcionada");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const layerIds = Array.isArray(layerId) ? layerId : [layerId];
      const newLayers = [];

      layerIds.forEach((id) => {                                                                                
        const featureLayer = EL.featureLayer({
          url: `${url}/${id}`,
          where: where, 
          style: typeof style === 'function' ? style(id) : style,                                                           
          onEachFeature: (feature, layer) => {
            if (popupTemplate) {
              const template = typeof popupTemplate === 'function' ? 
                popupTemplate(feature, id) : 
                popupTemplate;
              layer.bindPopup(template);
            }
          }
        }).addTo(map);

        // Eventos para manejar carga y errores
        featureLayer.on("loading", () => {
          setLoading(true);
        });

        featureLayer.on("load", () => {
          setLoading(false);
          setError(null);
          if (onLayerLoad) {
            onLayerLoad(featureLayer, id);
          }
        });

        featureLayer.on("error", (err) => {
          setLoading(false);
          setError(`Error en capa ${id}: ${err.message || "Error al cargar la capa"}`);
          if (onLayerError) {
            onLayerError(err, id);
          }
        });

        newLayers.push(featureLayer);
      });

      setLayers(newLayers);

      return () => {
        newLayers.forEach(layer => {
          if (layer && map.hasLayer(layer)) {
            map.removeLayer(layer);
          }
        });
      };
    } catch (err) {
      setLoading(false);
      setError(err.message || "Error al crear las capas");
      if (onLayerError) {
        onLayerError(err);
      }
    }
  }, [map, url, layerId, style, popupTemplate, onLayerLoad, onLayerError]);

  // Componente para mostrar estado de carga/error
  if (loading || error) {
    return (
      <div className="arcgis-layer-status" style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
      }}>
        {loading && <div>Cargando capa(s) ArcGIS...</div>}
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      </div>
    );
  }

  return null;
}

// Propiedades por defecto
ArcGISFeatureLayer.defaultProps = {
  style: { color: "#3388ff", weight: 2 },
  popupTemplate: (feature, layerId) => {
    const props = feature.properties || {};
    return `
      <div style="max-width: 300px;">
        <h4 style="margin: 0 0 8px 0; color: #333;">${props.NOMBRE || 'Sin nombre'}</h4>
        <hr style="margin: 8px 0;">
        ${props.OBJECTID ? `<p style="margin: 4px 0;"><strong>ID:</strong> ${props.OBJECTID}</p>` : ''}
        ${props.DESCRIPCION ? `<p style="margin: 4px 0;"><strong>Descripción:</strong> ${props.DESCRIPCION}</p>` : ''}
        ${props.UBICACION ? `<p style="margin: 4px 0;"><strong>Ubicación:</strong> ${props.UBICACION}</p>` : ''}
        ${props.AREA ? `<p style="margin: 4px 0;"><strong>Área:</strong> ${props.AREA} ha</p>` : ''}
        ${layerId !== undefined ? `<p style="margin: 4px 0;"><strong>Capa:</strong> ${layerId}</p>` : ''}
      </div>
    `;
  }
};

export default ArcGISFeatureLayer;

import L from "leaflet";
import mercados_minoristas from "../assets/mercados_minoristas.svg";
import mercados_mayoristas from "../assets/mercados_mayoristas.svg";
import zonas_industriales from "../assets/zonas_industriales.svg";
import parques_industriales from "../assets/parques_industriales.svg";

const createIcon = (url) =>
  new L.Icon({
    iconUrl: url,
    iconRetinaUrl: url,
    iconSize: [15, 15],
    iconAnchor: [15, 40],
    popupAnchor: [0, -35],
    shadowUrl: null,
  });

export const icons = {
  "MERCADOS DE ABASTOS MINORISTAS": createIcon(mercados_minoristas),
  "MERCADOS DE ABASTOS MAYORISTAS": createIcon(mercados_mayoristas),
  "ZONAS INDUSTRIALES": createIcon(zonas_industriales),
  "PARQUES INDUSTRIALES": createIcon(parques_industriales),
  default: createIcon("/icons/marker-red.svg"),
};
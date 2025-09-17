import { Popup } from "react-leaflet";
import { RightPanel } from "./RightPanel";

const HandlerOpenFicha = () => {
};

const PopupInfo = (item) => {
  return (
    <Popup>
      <strong>{item.nombre}</strong>
      <br />
      {item.departamento} - {item.provincia}
      <br />
      Etapa: {item.etapa}
      <br />
      Costo: {item.costo_inversion}
      <br />
      <button
        disabled={false}
        style={{
          marginTop: "5px",
          background: "#b71c1c",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
        onClick={() => HandlerOpenFicha(item)}
      >
        Ver ficha completa
      </button>
    </Popup>
  );
};

export default PopupInfo;

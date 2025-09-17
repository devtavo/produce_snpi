import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button
} from "@mui/material";
import { Close } from "@mui/icons-material";
import "./RightPanel.css";

const RightPanel = ({ isOpen, onClose, selectedItem }) => {
  if (!selectedItem) return null;

  const rows = [
    { label: "UBICACIÓN:", value: selectedItem.ubicacion || selectedItem.departamento || "" },
    { label: "UBIGEO:", value: selectedItem.ubigeo || "" },
    { label: "TIPO:", value: selectedItem.tipo || "" },
    { label: "CUI:", value: selectedItem.cui || "" },
    { label: "INICIO DE OBRA:", value: selectedItem.inicio_obra || "" },
    { label: "N° PUESTOS:", value: selectedItem.numero_puestos || selectedItem.puestos || "" },
    { label: "COSTO INVERSIÓN:", value: selectedItem.costo_inversion || "" },
    { label: "BENEFICIARIOS:", value: selectedItem.beneficiarios || "" },
    { label: "UNIDAD FORMULADORA:", value: selectedItem.unidad_formuladora || "" },
    { label: "UNIDAD EJECUTORA DE INV.:", value: selectedItem.unidad_ejecutora || "" },
    { label: "PLAZO DE EJECUCIÓN DE OBRA:", value: selectedItem.plazo_ejecucion || "" },
    { label: "ESTADO:", value: selectedItem.estado || "" },
    { label: "COORDENADAS:", value: selectedItem.coordenadas || "" },
    { label: "CARACTERÍSTICAS DEL PROYECTO:", value: selectedItem.caracteristicas_proyecto || "" }
  ];

  const descripcionProyecto = selectedItem.descripcion_proyecto || "";

  const ejecucionFisicaRows = [
    { label: "EJECUCIÓN FÍSICA:", value: selectedItem.ejecucion_fisica || "" },
    { label: "EJECUCIÓN FINANCIERA:", value: selectedItem.ejecucion_financiera || "" },
    { label: "HITOS PRÓXIMOS:", value: selectedItem.hitos_proximos || "" },
    { label: "ESTADÍSTICAS:", value: selectedItem.estadisticas || "" }
  ];

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Paper
        sx={{
          width: 700,
          maxHeight: "80vh",
          borderRadius: "12px",
          overflowY: "auto",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          p: 0,
          bgcolor: "#f5f5f5"
        }}
      >
        <Box sx={{ bgcolor: "red", p: 1, color: "white" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", m: 0 }}>
            {selectedItem.nombre || "Detalle"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, p: 1 }}>
          <Table sx={{ width: "60%", borderCollapse: "collapse" }}>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#d3d3d3" : "#b0b0b0",
                    "& td": { border: "none", padding: "4px 8px" }
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                    {row.label}
                  </TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ width: "40%" }}>
            <img
              src={selectedItem.imagen }
              alt={selectedItem.nombre}
              style={{ width: "100%", borderRadius: "8px" }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Button variant="contained" color="error" sx={{ minWidth: 120, p: 0.5 }}>
                Ayuda de memoria
              </Button>
              <Button variant="contained" sx={{ backgroundColor: "#808080", minWidth: 120, p: 0.5 }}>
                Descargar
              </Button>
            </Box>
          </Box>
        </Box>

        {descripcionProyecto && (
          <Box sx={{ bgcolor: "red", p: 1, color: "white", mt: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", m: 0 }}>
              Descripción del Proyecto
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, whiteSpace: "pre-line" }}>
              {descripcionProyecto}
            </Typography>
          </Box>
        )}

        <Box sx={{ bgcolor: "red", p: 1, color: "white", mt: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", m: 0 }}>
            Ejecución Física
          </Typography>
          <Table sx={{ width: "100%", borderCollapse: "collapse", bgcolor: "#f5f5f5" }}>
            <TableBody>
              {ejecucionFisicaRows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#d3d3d3" : "#b0b0b0",
                    "& td": { border: "none", padding: "4px 8px" }
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                    {row.label}
                  </TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Modal>
  );
};

export default RightPanel;

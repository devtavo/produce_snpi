import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import mercados_minoristas from "../assets/mercados_minoristas.svg";
import mercados_mayoristas from "../assets/mercados_mayoristas.svg";
import zonas_industriales from "../assets/zonas_industriales.svg";
import parques_industriales from "../assets/parques_industriales.svg";

const Legend = () => {
  const legendItems = [
    {
      icon: mercados_minoristas,
      label: "Mercados Minoristas",
      color: "#1976d2"
    },
    {
      icon: mercados_mayoristas,
      label: "Mercados Mayoristas",
      color: "#2e7d32"
    },
    {
      icon: zonas_industriales,
      label: "Zonas Industriales",
      color: "#ed6c02"
    },
    {
      icon: parques_industriales,
      label: "Parques Industriales",
      color: "#9c27b0"
    }
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(8px)",
        padding: "12px",
        borderRadius: "8px",
        minWidth: "200px",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "rgba(0, 0, 0, 0.2) 5px 0 5px",
      }}
    >
      <Typography 
        variant="subtitle2" 
        sx={{ 
          fontWeight: "bold", 
          marginBottom: "8px",
          color: "#fff",
          fontSize: "14px"
        }}
      >
        Leyenda
      </Typography>
      
      <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {legendItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 0"
            }}
          >
            <Box
              sx={{
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src={item.icon}
                alt={item.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain"
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontSize: "12px",
                color: "#fff",
                fontWeight: 500
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default Legend;

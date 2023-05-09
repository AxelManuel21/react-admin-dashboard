import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

import { MapContainer, TileLayer, Marker, Tooltip} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import { useNavigate } from 'react-router-dom';

import React from "react";

const estaciones = [
  { id: 1, nombre: 'Calz. Independencia Norte & C. Igualdad', latitud: 20.716145, longitud: -103.321865, estado: 'encendida' },
  { id: 2, nombre: 'Sierra Nevada', latitud: 20.692724, longitud: -103.329490, estado: 'apagada' },
  { id: 3, nombre: 'Mariano Bárcena', latitud: 20.689053, longitud: -103.351851, estado: 'desactivada' },
  // Agrega más estaciones según tus necesidades
];

const iconEncendida = new L.Icon({
  iconUrl: '../../assets/icono-encendida.png',
  iconSize: [30, 30],
});

const iconApagada = new L.Icon({
  iconUrl: '../../assets/icono-apagada.png',
  iconSize: [30, 30],
});

const iconDesactivada= new L.Icon({
  iconUrl: '../../assets/icono-desactivada.png',
  iconSize: [30, 30],
});



const Inicio = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  function HandleClick(pipo){
    navigate('/estacion',{state:{id:1,name:pipo}});
  }
  function MapComponent() {
    return (
      <MapContainer center={[20.6925, -103.3199]} zoom={14} scrollWheelZoom={false} doubleClickZoom ={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  
        {estaciones.map((estacion) => {
          let markerIcon;
  
          switch (estacion.estado) {
            case 'encendida':
              markerIcon = iconEncendida;
              break;
            case 'apagada':
              markerIcon = iconApagada;
              break;
            case 'desactivada':
              markerIcon = iconDesactivada;
              break;
            default:
              markerIcon = iconDesactivada;
              break;
          }
  
          return (
            <Marker
              key={estacion.id}
              position={[estacion.latitud, estacion.longitud]}
              icon={markerIcon}
              eventHandlers = {{click: () => HandleClick(estacion.nombre)}}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                
                {estacion.nombre}
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    );
  }
  
  return (
    <>
    <Box m="20px">
      <Header title="Estaciones" subtitle="Bienvenido a tus estaciones" />
      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <MapComponent/>
      </Box>
    </Box>
    </>
  );
  
};

export default Inicio;

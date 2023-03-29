import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

import { MapContainer, TileLayer, Marker, Tooltip} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { useNavigate } from 'react-router-dom';

import React from "react";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const Inicio = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  function HandleClick(pipo){
    navigate('/estacion',{state:{id:1,name:pipo}});
  }
  
  return (
    <>
    <Box m="20px">
      <Header title="Inicio" subtitle="Pipo" />
      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
          <MapContainer center={[20.6925, -103.3199]} zoom={14} scrollWheelZoom={false} doubleClickZoom ={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[20.716145, -103.321865]} eventHandlers = {{click: () => HandleClick("Calz. Independencia Norte & C. Igualdad")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
              
                Calz. Independencia Norte & C. Igualdad
              </Tooltip>
            </Marker>
            <Marker position={[20.692724, -103.329490]} eventHandlers = {{click: () => HandleClick("Sierra Nevada")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
                Sierra Nevada
              </Tooltip>
            </Marker>
            <Marker position={[20.689053, -103.351851]} eventHandlers = {{click: () => HandleClick("Mariano Bárcena")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
                Mariano Bárcena
              </Tooltip>
            </Marker>
            <Marker position={[20.676057, -103.408095]} eventHandlers = {{click: () => HandleClick("Av. Vallarta")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
                Av. Vallarta
              </Tooltip>
            </Marker>
            <Marker position={[20.674844, -103.354680]} eventHandlers = {{click: () => HandleClick("Calzada Independencia Juarez")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
                Calzada Independencia Juarez
              </Tooltip>
            </Marker>
            <Marker position={[20.675286, -103.341931]} eventHandlers = {{click: () => HandleClick("Calzada Independencia J.Mina")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
                Calzada Independencia J.Mina
              </Tooltip>
            </Marker>
            <Marker position={[20.662662, -103.339787]} eventHandlers = {{click: () => HandleClick("Gante")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
                Gante
              </Tooltip>
            </Marker>
            <Marker position={[20.657059, -103.335639]} eventHandlers = {{click: () => HandleClick("Violeta")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
                Violeta
              </Tooltip>
            </Marker>
            <Marker position={[20.702484, -103.357847]} eventHandlers = {{click: () => HandleClick("Enrique Díaz de León")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
                Enrique Díaz de León
              </Tooltip>
            </Marker>
            <Marker position={[20.624239, -103.324797]} eventHandlers = {{click: () => HandleClick("Siderurgia")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
                Siderurgia
              </Tooltip>
            </Marker>
            <Marker position={[20.644057, -103.330644]} eventHandlers = {{click: () => HandleClick("Río La Barca")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
                Río La Barca
              </Tooltip>
            </Marker>
            <Marker position={[20.638744, -103.356107]} eventHandlers = {{click: () => HandleClick("Calle 22")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
                Calle 22
              </Tooltip>
            </Marker>
            <Marker position={[20.636884, -103.353950]} eventHandlers = {{click: () => HandleClick("Calle 26")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
                Calle 26
              </Tooltip>
            </Marker>
            <Marker position={[20.598288, -103.418291]} eventHandlers = {{click: () => HandleClick("Bahía de Banderas")}}>
              <Tooltip direction="top" offset={[13, 0]} opacity={1} permanent>
                Bahía de Banderas
              </Tooltip>
            </Marker>
          </MapContainer>
      </Box>
    </Box>
    </>
  );
  
};

export default Inicio;

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import RadialBar from "../../components/MyResponsiveRadialBar";
import WaterOutlinedIcon from '@mui/icons-material/WaterOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import LeakAddOutlinedIcon from '@mui/icons-material/LeakAddOutlined';
import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';
import { ResponsiveLine } from '@nivo/line';
import 'leaflet/dist/leaflet.css';

import {useLocation} from 'react-router-dom';

import React, { useEffect, useState } from "react";

import Switch from '@mui/material/Switch';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { mockDataMeteorologica } from "../../data/mockData";



function createData2(name, stat) {
  return { name, stat};
}




const Dashboard = () => {

  const [data, setData] = useState([
    {
      id: 'LEL',
      data: [],
    },
    {
      id: 'CO',
      data: [],
    },
    {
      id: 'H2S',
      data: [],
    },
    {
      id: 'O2',
      data: [],
    },
  ]);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [datos, setDatos] = useState([]);
  const label = { inputProps: { 'aria-label': 'Size switch demo' } };

  const rows = [
    createData2('LEL', 3),
    createData2('LEL INT',4),
    createData2('H2S', 3),
    createData2('C0', 2),
    createData2('02', 4),
    createData2('VOC', 1),
    createData2('AMMONIA', 5),
  ];
  const newrows = [
    createData2('Presion Atmosferica', datos.presion_atmosferica),
    createData2('Velocidad Viento', datos.velocidad_viento),
    createData2('Humedad Relativa', datos.humedad_relativa),
    createData2('Precipitacion Pluvial', datos.precipitacion_pluvial),
    createData2('Dirección Viento', datos.direccion_viento),
    createData2('Radiacion Solar', datos.radiacion_solar),
  ];
  const checkStation = () => {
    /*
      fetch('https://siapa.ciateq.net.mx/backend/api/verify', {
        
        method: 'GET',
        headers: {
          accesstoken: sessionStorage.getItem('JWT')
        },
      })
      
      .then((response) => response.json())
      .then(response => {

        if(response.hasOwnProperty('verified')){
          setIsLoggedIn(true);
          
        }
        else{
          setIsVerified(true);
          return navigate('/');
        };
        console.log(response);
        
      })

      .catch(err => {
        navigate('/');
        console.log("fetch error" + err);
        setHasError(true);
        setIsVerified(true);
      })
      */
      
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mockDataMeteorologica.length); // Genera un índice aleatorio
      const selectedData = mockDataMeteorologica[randomIndex]; // Obtiene el objeto correspondiente al índice aleatorio
      setDatos(selectedData);
      //checkStation();
      setData((prevState) => [
        {
          id: 'LEL',
          data: [
            ...prevState[0].data.slice(-9),
            {
              x: new Date().toLocaleTimeString(),
              y: Math.floor(Math.random() * 101),
            },
          ],
        },
        {
          id: 'CO',
          data: [
            ...prevState[1].data.slice(-9),
            {
              x: new Date().toLocaleTimeString(),
              y: Math.floor(Math.random() * 101),
            },
          ],
        },
        {
          id: 'H2S',
          data: [
            ...prevState[2].data.slice(-9),
            {
              x: new Date().toLocaleTimeString(),
              y: Math.floor(Math.random() * 101),
            },
          ],
        },
        {
          id: 'O2',
          data: [
            ...prevState[3].data.slice(-9),
            {
              x: new Date().toLocaleTimeString(),
              y: Math.floor(Math.random() * 101),
            },
          ],
        },
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={location.state.name} subtitle="Monitoreo de la estación" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="MODO"
            progress="0.75"
            increase="+14%"
            icon={
              <ModeStandbyOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="COMM"
            progress="0.50"
            increase="+21%"
            icon={
              <LeakAddOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="CFE"
            progress="0.75"
            increase="+14%"
            icon={
              <FlashOnOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="BOMBA"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="FLUJO"
            progress="0.80"
            increase="+43%"
            icon={
              <AirOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="NIVEL"
            progress="0.80"
            increase="+43%"
            icon={
              <WaterOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        

        
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          ><Box>
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
          >
            Niveles
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
            O2, H2S, CO Y LEL
          </Typography>
        </Box>
        <Box>
          <IconButton>
            <DownloadOutlinedIcon
              sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
            />
          </IconButton>
        </Box>
      </Box>

          <Box height="250px" m="-20px 0 0 0">
            <ResponsiveLine
              data={data}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 0, max: 100 }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'hora',
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'valor',
                legendOffset: -40,
                legendPosition: 'middle',
              }}
              colors={{ scheme: 'nivo' }}
              pointSize={10}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: colors.grey[100],
                    },
                  },
                  legend: {
                    text: {
                      fill: colors.grey[100],
                    },
                  },
                  ticks: {
                    line: {
                      stroke: colors.grey[100],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: colors.grey[100],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: colors.grey[100],
                  },
                },
                tooltip: {
                  container: {
                    color: colors.primary[500],
                  },
                },
              }}
              legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={true}
            />


            
          </Box>
        </Box>

        
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Sistemas
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
              </Box>
              <Box>
                <Switch {...label} defaultChecked color="secondary"/>
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
          Meteorológico
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newrows.map((newrows) => (
            <TableRow
              key={newrows.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {newrows.name}
              </TableCell>
              <TableCell align="right">{newrows.stat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Niveles
          </Typography>
          <Box height="250px" mt="-20px">
            <RadialBar isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
          Gas
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((rows) => (
            <TableRow
              key={rows.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {rows.name}
              </TableCell>
              <TableCell align="right">{rows.stat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
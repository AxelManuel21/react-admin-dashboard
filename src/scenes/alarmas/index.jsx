import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import Header from "../../components/Header";

import 'leaflet/dist/leaflet.css';

import { mockDataAlarms } from "../../data/mockData";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Alarmas = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  const columns = [
    { field: "id", headerName: "Tipo de alarma", flex: 0.5 },
    
    {
      field: "name",
      headerName: "Fecha",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Estación",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Tipo de alarma",
      flex: 1,
    },
    {
      field: "city",
      headerName: "Detalles",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Alarmas" subtitle="Bienvenido a tus alarmas" />

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

        {/* Box Alarma 1 */}
        
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt="25px"
            p="0 30px"
        >
          <Box>
          <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
          <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Alarma tipo 1
          </Typography>
          </Box>
              
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
                
              >
                0
              </Typography>
        </Box>

        {/* Box Alarma 2 */}
        
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt="25px"
            p="0 30px"
        >
          <Box>
          <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
          <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Alarma tipo 2
          </Typography>
          </Box>
              
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
                
              >
                0
              </Typography>
        </Box>

        {/* Box Alarma 3 */}
        
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt="25px"
            p="0 30px"
        >
          <Box>
          <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
          <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Alarma tipo 3
          </Typography>
          </Box>
              
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
                
              >
                0
              </Typography>
        </Box>

        {/* Box Alarma 4 */}
        
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt="25px"
            p="0 30px"
        >
          <Box>
          <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
          <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Alarma tipo 4
          </Typography>
          </Box>
              
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
                
              >
                0
              </Typography>
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          
          
          <Box
        m="40px 0 0 0"
        height="60vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataAlarms}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
        </Box>
        

        {/* ROW 3 */}
        
        
      </Box>
    </Box>
  );
};

export default Alarmas;

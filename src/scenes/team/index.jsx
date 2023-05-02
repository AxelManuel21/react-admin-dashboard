import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  function RoleDisplay(rol) {
    let role;
    if (rol === 1) {
        role = 'SuperAdmin';
    } else if (rol === 2) {
        role = 'Admin';
    } else if (rol === 3) {
        role = 'User';
    }
    return <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{role}</Typography>;
}


  const columns = [
    { field: "id_usuarios", headerName: "ID" },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "login",
      headerName: "Nombre de usuario",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "id_rol",
      headerName: "Rol de usuario",
      flex: 1,
      renderCell: ({ row: { id_rol } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              id_rol === 1
                ? colors.greenAccent[600]
                : id_rol === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            
            {id_rol === 1 && <AdminPanelSettingsOutlinedIcon />}
            {id_rol === 2 && <SecurityOutlinedIcon />}
            {id_rol === 3 && <LockOpenOutlinedIcon />}
            {RoleDisplay(id_rol)}
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
        }}
      >
        <DataGrid getRowId={(row) => row.id_usuarios} rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;

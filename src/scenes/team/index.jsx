import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
//import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { useNavigate } from 'react-router-dom';

//Componentes para el texto del modal
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
//

function Modal({ message, onClose }) {
  return (
    
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
    </Dialog>
  );
}

const Team = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [users, setUsers] = useState([]);
  
  const [message, setMessage] = useState('');
  
  const [showModal, setShowModal] = useState(false);

  const deleteUser = (id) => {
    
    fetch('https://siapa.ciateq.net.mx/backend/api/users/'+id, {
      
      method: 'DELETE',
      headers: {
        accesstoken: sessionStorage.getItem('JWT')
      },
    })
    
    .then((response) => response.json())
    .then(response => {
      setMessage(JSON.stringify(response.message));
      setShowModal(true);
    })
    .catch(err => {
      console.log("fetch error" + err);
      setMessage("Error de comunicación: " + err);
      setShowModal(true);
    })
    
    
}


  //es el metodo que permite obtener la lista de usuarios de la base de datos 
  const checkUsers = () => {
    
      fetch('https://siapa.ciateq.net.mx/backend/api/users', {
        
        method: 'GET',
        headers: {
          accesstoken: sessionStorage.getItem('JWT')
        },
      })
      
      .then((response) => response.json())
      .then(response => {
        const data = response.listUsers;
        setUsers(data);
        console.log(data); 
      })
      .catch(err => {
        console.log("fetch error" + err);
      })
      
      
  }

  //Funcion que imprime el rol del usuario.
  function RoleDisplay(rol) {
    let role;
    if (rol === '1') {
        role = 'SuperAdmin';
    } else if (rol === '2') {
        role = 'Admin';
    } else if (rol === '3') {
        role = 'User';
    }
    return <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{role}</Typography>;
}

  //Columnas del data grid
  const columns = [
    { field: "id_usuario", headerName: "ID" },
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
              id_rol === '1'
                ? colors.greenAccent[600]
                : id_rol === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            
            {id_rol === '1' && <AdminPanelSettingsOutlinedIcon />}
            {id_rol === '2' && <SecurityOutlinedIcon />}
            {id_rol === '3' && <LockOpenOutlinedIcon />}
            {RoleDisplay(id_rol)}
          </Box>
        );
      },
    },
    {
      field: "modificar",
      headerName: "Modificar usuario",
      renderCell: ( {row: { id_usuario }} ) => (
        <IconButton onClick={() => { navigate('/update',{state:{id:id_usuario}}) }}>
          <ModeEditOutlineOutlinedIcon />
        </IconButton>
      ),
    },
    {
      field: "borrar",
      headerName: "Borrar usuario",
      renderCell: ({row: { id_usuario }}) => (
        <IconButton onClick={() => { deleteUser(id_usuario) }}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      ),
    },
  ];

  //El useEffect le dice a react que debe realizar algo despues de renderizar  
  useEffect(() => {
    checkUsers();
  }, [] );

  return (
    <Box m="20px">
      <Header title="CRUD DE USUARIOS" subtitle="Maneja a tu equipo de trabajo." />
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
        {
          // Creacion del data grid en react, usa las columnas declaras con anterioridad y los datos de los usuarios como filas
        }
        <DataGrid getRowId={(row) => row.id_usuario} rows={users} columns={columns} />
        {showModal && <Modal 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        message={message} onClose={() => setShowModal(false)} />}
      </Box>
    </Box>
  );
};

export default Team;

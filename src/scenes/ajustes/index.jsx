import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import * as React from 'react';
import {useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Componentes para el texto del modal
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
//

//Componentes para la visibilidad on/off de la contraseña
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import Co2OutlinedIcon from '@mui/icons-material/Co2Outlined';
import { tokens } from "../../theme";

function Modal({ message, onClose }) {
  return (
    
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
    </Dialog>
  );
}

const Ajustes = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  //Controladores de estados del modal
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  //

  //Controladores de estados de la contraseña
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  //
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const handleFormSubmit = (values) => {
    
    
    fetch('https://siapa.ciateq.net.mx/backend/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accesstoken: sessionStorage.getItem('JWT')
      },
      body: JSON.stringify({
        nombre: values.nombre,
        login: values.userName,
        password: values.password,
        email: values.email,
        id_rol: values.rol, 
        
      })
    })
    .then((response) => response.json())
    .then(response => {
      console.log(response);
      setMessage(JSON.stringify(response.message));
      setShowModal(true);
    })
    .catch(err => {
      console.log("fetch error" + err);
      setMessage("Error de comunicación: " + err);
      setShowModal(true);
    })
    
   setMessage("El usuario: "+ JSON.stringify(values.userName) + " se ha creado correctamente.");
   setShowModal(true);
   
   console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="AJUSTES" subtitle="Ajusta los parámetros" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="flex-start"
            alignItems="center"
            
            sx={{ gridColumn: "span 4" }}
          >
        <Box>
            <Co2OutlinedIcon
              sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
            />
        </Box>
        
          <Box>
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.greenAccent[500]}
          >
            Variables Gas
          </Typography>
          
        </Box>
        
      </Box>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre}
                name="nombre"
                error={!!touched.nombre && !!errors.nombre}
                helperText={touched.nombre && errors.nombre}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                sx={{ gridColumn: "span 2" }}
                inputProps={{ maxLength: 64 }}
              />

        


              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombre de usuario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={!!touched.userName && !!errors.userName}
                helperText={touched.userName && errors.userName}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                sx={{ gridColumn: "span 2" }}
                inputProps={{ maxLength: 64 }}
              />

      <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="flex-start"
            alignItems="center"
            
            sx={{ gridColumn: "span 4" }}
          >
        <Box>
            <CloudOutlinedIcon
              sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
            />
        </Box>
        
          <Box>
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.greenAccent[500]}
          >
            Variables Meteorologicas
          </Typography>
          
        </Box>
        
      </Box>


              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                sx={{ gridColumn: "span 2" }}
                inputProps={{ maxLength: 64 }}
              />
              <TextField
                fullWidth
                variant="filled"
                type={showPassword ? "text" : "password"}
                label="Contraseña"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                sx={{ gridColumn: "span 2" }}
              />

              
              


            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Guardar Cambios
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {showModal && <Modal 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        message={message} onClose={() => setShowModal(false)} />}



    </Box>
  );
};



const checkoutSchema = yup.object().shape({
  nombre: yup.string().required("required"),
  userName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  nombre: "",
  userName: "",
  email: "",
  password: "",
};

export default Ajustes;

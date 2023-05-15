import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import * as React from 'react';
import { useEffect, useState } from "react";
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

import {useLocation} from 'react-router-dom';

import {sha256} from 'crypto-hash';

function Modal({ message, onClose }) {
  return (
    
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
    </Dialog>
  );
}

const Update = () => {
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

  const [user, setUser] = useState();

  
  const location = useLocation();

  
  const checkUser = () => {
    
    fetch('https://siapa.ciateq.net.mx/backend/api/users/'+location.state.id, {
      
      method: 'GET',
      headers: {
        accesstoken: sessionStorage.getItem('JWT')
      },
    })
    
    .then((response) => response.json())
    .then(response => {
      const data = response.result;
      console.log(data.nombre)
      setUser(data);
    })
    .catch(err => {
      console.log("fetch error" + err);
    })
  }

  const initialValues = {
    nombre: user?.nombre ?? "",
    userName: user?.login ?? "",
    email: user?.email ?? "",
    password: "",
    rol: user?.id_rol ?? "", 
  };

  const handleFormSubmit = async (values) => {
    // sessionStorage.setItem('nombre', values.userName); //cuando no sean pruebas hay que quitarlo
    const result = await sha256(values.password);
    console.log(result);
    fetch('https://siapa.ciateq.net.mx/backend/api/users/'+location.state.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accesstoken: sessionStorage.getItem('JWT')
      },
      body: JSON.stringify({
        nombre: values.nombre,
        login: values.userName,
        password: result,
        email: values.email,
        id_rol: values.rol, 
        id_estacion: 1,
        
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
    
   setMessage("El usuario: "+ JSON.stringify(values.userName) + " se ha actualizado correctamente.");
   setShowModal(true);
   
   console.log(values);
  };

  useEffect(() => {
    checkUser();
  }, [] );

  return (
    <Box m="20px">
      <Header title="ACTUALIZAR USUARIO" subtitle="Introduce los nuevos datos del usuario" />

      <Formik
        enableReinitialize={true}
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
                InputProps={{ // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              
              <FormControl fullWidth variant="filled">
                
                <InputLabel id="demo-simple-select-label" 
                sx={{"&.Mui-focused": {
                color: "white"}}}>Rol de usuario
                </InputLabel>

                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.rol}
                  label="Rol"
                  onChange={handleChange}
                  name="rol"  
                  error={!!touched.rol && !!errors.rol}
                  helperText={touched.rol && errors.rol}
                  InputLabelProps={{
                    style: { color: '#fff' },
                  }}
                >
                  <MenuItem value={1}>Super Administrador</MenuItem>
                  <MenuItem value={2}>Administrador</MenuItem>
                  <MenuItem value={3}>Usuario</MenuItem>
                </Select>
              </FormControl>



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
  rol: yup.string().required("required"),
});


export default Update;

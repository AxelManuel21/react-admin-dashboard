import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
//import ProtectedRoutes from "../../utils/ProtectedRoutes";
//import MemoryJWT from "../../inMemoryJwt";

import {useState } from "react";

//Componentes para la visibilidad on/off de la contraseña
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//

import {sha256} from 'crypto-hash';

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  //const myFunc = MemoryJWT;
  sessionStorage.removeItem('JWT');
  sessionStorage.removeItem('nombre');
  sessionStorage.clear();

  //Controladores de estados de la contraseña
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  //
  

  //metodo que corrobora si el jwt es valido para brindar acceso a la sesión
  const checkJWT = () => {
    
    fetch('https://siapa.ciateq.net.mx/backend/api/verify', {
          
          method: 'GET',
          headers: {
            'accessToken': sessionStorage.getItem('JWT')

          },
        })
        
        .then((response) => response.json())
        .then(response => {

          if(response.hasOwnProperty('verified')){

            navigate('/inicio');
            
          }else{
            navigate('/');
          };
      //    console.log(response);
    //console.log("Token: "+sessionStorage.getItem('JWT'));
          
        })

        .catch(err => {
          console.log("fetch error" + err);
        })
  }

  //Metodo que recibe los valores del login y corrobora si esta en la bdd para generar un JWT, si este es valido da acceso a la sesión
  const handleFormSubmit = async (values) => {
   // sessionStorage.setItem('nombre', values.userName); //cuando no sean pruebas hay que quitarlo
   const result = await sha256(values.password);
   console.log(result);
    fetch('https://siapa.ciateq.net.mx/backend/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: values.userName,
        pass: result
      })
    })
    .then((response) => response.json())
    .then(response => {
      if(response.hasOwnProperty('accessToken')){
        // clear whole storage
        sessionStorage.clear();
        sessionStorage.setItem('JWT', response.accessToken);
        sessionStorage.setItem('nombre', values.userName);
        sessionStorage.setItem('rol', 'SuperAdministrador');
        //console.log(sessionStorage.getItem('JWT'));
        //myFunc().setToken(response.accessToken);
        checkJWT();
        
      }
      else{
        navigate('/');
      };
      console.log(response);
    })
    .catch(err => {
      navigate('/');
      console.log("fetch error" + err);
    })
    
    navigate('/inicio');
  };

  return (
    <Box m="20px">
      <Header title="Login" subtitle="Entra a tu perfil" />

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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Usuario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={!!touched.userName && !!errors.userName}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
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
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};



const checkoutSchema = yup.object().shape({
  userName: yup.string().required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  userName: "",
  password: "",
};

export default Login;

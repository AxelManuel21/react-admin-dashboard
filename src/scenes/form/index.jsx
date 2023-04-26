import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState(null);
  const handleOpen = (values) =>
  {
    setValues(values)
    setOpen(true);
  }; 
  const handleClose = () => 
  {
    setValues(null) 
    setOpen(false);
  }
  


  const handleFormSubmit = (values) => {
    
    /*
    fetch(process.env.REACT_APP_AUTH {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: values.nombre,
        userName: values.userName,
        email: values.email,
        password: values.password,
        rol: values.rol, 
        
      })
    })
    .then((response) => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log("fetch error" + err);
    })
    */
   handleOpen(values);
   console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREAR USUARIOS" subtitle="Crear un nuevo perfil de usuario" />

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
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre}
                name="nombre"
                error={!!touched.nombre && !!errors.nombre}
                helperText={touched.nombre && errors.nombre}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contraseña"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />

              
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rol de usuario</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.rol}
                  label="Rol"
                  onChange={handleChange}
                  name="rol"  
                  error={!!touched.rol && !!errors.rol}
                  helperText={touched.rol && errors.rol}
                >
                  <MenuItem value={1}>Super Administrador</MenuItem>
                  <MenuItem value={2}>Administrador</MenuItem>
                  <MenuItem value={3}>Usuario</MenuItem>
                </Select>
              </FormControl>



            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nuevo Usuario
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {values}
          </Typography>
        </Box>
      </Modal>



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
const initialValues = {
  nombre: "",
  userName: "",
  email: "",
  password: "",
  rol: "", 
};

export default Form;

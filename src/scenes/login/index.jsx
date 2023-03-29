import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const handleClick = (userName,password) => {
    fetch('http://localhost:3001/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: userName,
        pass: password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .then(function (response) {
      if(response.data.hasOwnProperty('accessToken')){
        navigate('/inicio');
      }
      console.log(response.data);
    });
  }
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
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" onClick={handleClick(values.userName,values.password)}>
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

import React, { useState } from "react";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from "../components/Header";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Inicio" subtitle="Pipo" />
      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <div className="Login">
        <TextField id="outlined-basic" label="email" variant="outlined" />
        <TextField id="outlined-basic" label="password" variant="outlined" />
        <Button variant="contained" href="/inicio">
            Login
        </Button>
    </div>
</Box>
</Box>
    

  );
}
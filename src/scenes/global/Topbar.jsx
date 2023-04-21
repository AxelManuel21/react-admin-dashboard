import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Clock from 'react-live-clock';
import moment from 'moment';
import 'moment/locale/es';
//import ProtectedRoutes from "../../ProtectedRoutes";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  moment.locale('es');
  //const myFunc = MemoryJWT;

  function HandleClick(){

    //myFunc().ereaseToken();
    // remove JWT from storage
    sessionStorage.removeItem('JWT');
    sessionStorage.removeItem('nombre');

    // clear whole storage
    sessionStorage.clear();

  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box component="div" sx={{ visibility: 'visible' }}>
        {<Clock date={''} format={'h:mm:ss A, LL'}  ticking={true} timezone={'America/Los_Angeles'} />}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton href="/" eventHandlers = {{click: () => HandleClick()}}>
          <ExitToAppOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;

import { useState  } from "react";
import { Routes, Route, useLocation  } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Alarmas from "./scenes/alarmas";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import ProtectedRoutes from "./ProtectedRoutes";
import Inicio from "./scenes/inicio";
import Login from "./scenes/login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";



function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {location.pathname !== '/' && <> 
          <Sidebar isSidebar={isSidebar} /></>}
          <main className="content">
          {location.pathname !== '/' && <> 
              <Topbar setIsSidebar={setIsSidebar}></Topbar> </>}
            <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoutes />} >
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/alarmas" element={<Alarmas />} />
              <Route path="/estacion" element={<Dashboard />} />
            </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

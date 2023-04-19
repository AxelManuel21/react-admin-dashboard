import { useState, useEffect  } from "react";
import { Routes, Route, useLocation  } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Alarmas from "./scenes/alarmas";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Inicio from "./scenes/inicio";
import Login from "./scenes/login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Auth from "./auth/auth";



function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();


  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = sessionStorage.getItem('JWT');
        if (!userToken || userToken === 'undefined' || userToken === 'null') {
          setIsLoggedIn(false);
        }
        else{
          setIsLoggedIn(true);
        }
    }
    useEffect(() => {
          
        checkUserToken();
        
        console.log(isLoggedIn);
    }, [isLoggedIn]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        {location.pathname !== '/' &&<> 
          <Sidebar isSidebar={isSidebar} /></>}
          <main className="content">
          {location.pathname !== '/' && <> 
              <Topbar setIsSidebar={setIsSidebar}></Topbar> </>}
            <Routes>
            <Route element={<Auth/>} >
              <Route path="/" element={<Login />} />
            </Route>
            
            <Route path="/inicio" element=
            {<ProtectedRoutes>
                <Inicio />
              </ProtectedRoutes>
            } />

            <Route path="/team" element=
            {<ProtectedRoutes>
                <Team />
              </ProtectedRoutes>
            } />
            
            <Route path="/contacts" element=
            {<ProtectedRoutes>
                <Contacts />
              </ProtectedRoutes>
            } />

            
            <Route path="/form" element=
            {<ProtectedRoutes>
                <Form />
              </ProtectedRoutes>
            } />

            <Route path="/alarmas" element=
            {<ProtectedRoutes>
                <Alarmas />
              </ProtectedRoutes>
            } />

            <Route path="/estacion" element=
            {<ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            } />

              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
import { useState, useEffect  } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Alarmas from "./scenes/alarmas";
import Team from "./scenes/team";
import Update from "./scenes/update";
import Form from "./scenes/form";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Inicio from "./scenes/inicio";
import Login from "./scenes/login";
import Ajustes from "./scenes/ajustes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Auth from "./auth/auth";

function PageNotFound() {
  return (
    <div>
      <h2>404 Page not found</h2>
    </div>
  );
}


function App() {
  const [theme, colorMode] = useMode();
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



          <main className="content">


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

            <Route path="/update" element=
            {<ProtectedRoutes>
                <Update />
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

            <Route path="/ajustes" element=
            {<ProtectedRoutes>
                <Ajustes />
              </ProtectedRoutes>
            } />

            <Route path="*" element={<PageNotFound />} />

              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
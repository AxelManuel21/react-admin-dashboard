import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";

const ProtectedRoute = (props) => {
    const [isSidebar, setIsSidebar] = useState(true);
    const navigate = useNavigate();
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [hasError, setHasError] = useState(false);

    const checkUserToken = () => {
      setIsLoggedIn(true);
      /*
        fetch('https://siapa.ciateq.net.mx/backend/api/verify', {
          
          method: 'GET',
          headers: {
            accesstoken: sessionStorage.getItem('JWT')
          },
        })
        
        .then((response) => response.json())
        .then(response => {

          if(response.hasOwnProperty('verified')){
            setIsLoggedIn(true);
            
          }
          else{
            setIsVerified(true);
            return navigate('/');
          };
          console.log(response);
          
        })

        .catch(err => {
          navigate('/');
          console.log("fetch error" + err);
          setHasError(true);
          setIsVerified(true);
        })
        */
        
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
          checkUserToken();
        }, 1000);
        return () => clearInterval(interval);
      }, []);
      /*
      if(!isVerified || hasError){
        navigate('/');
        return null; //or Loading component
      }

      if(!isLoggedIn){
        navigate('/');
        return null;
      }
      */
      return (     
        <>
      {isLoggedIn ? (
        <div className="protected">
          <Sidebar isSidebar={isSidebar}/>
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar}/> 
            {props.children}
          </main>
        </div>
      ) : null}
    </>
      );
}
export default ProtectedRoute;
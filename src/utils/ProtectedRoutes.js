import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";

import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";

const ProtectedRoute = (props) => {
    const [isSidebar, setIsSidebar] = useState(true);
    const navigate = useNavigate();
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    /*
    const checkUserToken = () => {
      //setIsLoggedIn(true);
      
        fetch('http://172.16.52.207:3001/api/verify', {
          
          method: 'GET',
          headers: {
            accesstoken: sessionStorage.getItem('JWT')
          },
        })
        
        .then((response) => response.json())
        .then(response => {

          if(response.hasOwnProperty('verified')){
            setIsLoggedIn(true);
            
          }else{
            return navigate('/');
          };
          console.log(response);
          
        })

        .catch(err => {
          navigate('/');
          console.log("fetch error" + err);
        })
        
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
          checkUserToken();
        }, 1000);
        return () => clearInterval(interval);
      }, [isLoggedIn]);
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
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    
    const checkUserToken = () => {
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
        }
        setIsVerified(true);
      })
      .catch(err => {
        console.log("fetch error" + err);
        setHasError(true);
        setIsVerified(true);
      })
    }

    const interval = setInterval(() => {
      checkUserToken();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  
  if(!isVerified || hasError){
    navigate('/');
    return null; //or Loading component
  }

  if(!isLoggedIn){
    navigate('/');
    return null;
  }

  return props.children;
  
}
export default ProtectedRoute;
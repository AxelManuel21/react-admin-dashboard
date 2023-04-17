
import { useNavigate } from 'react-router-dom';

export function 

Middleware (){
    const navigate = useNavigate();
    
    
    fetch('http://localhost:3001/api/verify', {
          
          method: 'GET',
          headers: {
            accesstoken: sessionStorage.getItem('JWT')
          },
        })
        
        .then((response) => response.json())
        .then(response => {

          if(response.hasOwnProperty('verified')){
            //<ProtectedRoutes verified={response.verified}></ProtectedRoutes>
            navigate('/inicio');
            //useAuth.login(true);
          }else{
            navigate('/');
          };
          console.log(response);
          
        })

        .catch(err => {
          console.log("fetch error" + err);
        })
  };
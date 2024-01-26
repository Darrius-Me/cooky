import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

function HomeScreen(){
    const navigate = useNavigate();

    // on accessing base url, check if user has already logged in. If yes, redirect to recipe list. If no, redirect to login page
    useEffect(() =>{
        const loggedin = sessionStorage.getItem('isLoggedIn');
        if (loggedin === 'true') {
            navigate('/recipes');
        }
        else {
            navigate('/login');
        }
      }, [navigate])

    return(
        <div>
        </div>
    );
}

export default HomeScreen;
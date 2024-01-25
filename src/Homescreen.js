import NavBar from './Navbar';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

function HomeScreen(){
    const navigate = useNavigate();

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
            <NavBar />
            
            

        </div>
    );
}

export default HomeScreen;
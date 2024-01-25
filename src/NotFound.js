import NavBar from "./Navbar";
import { useNavigate } from 'react-router-dom'


function NotFound(){
    const navigate = useNavigate();

    const gohome = () => {
        navigate('/recipes')
    }

    return(
        <div>
            <NavBar></NavBar>
            <h1 className="alternate_font" style={{color: "black", margin: 50}}>Page not found</h1>
            <button className="div-button" onClick={gohome}>Go to home</button>
        </div>
    );
}

export default NotFound;
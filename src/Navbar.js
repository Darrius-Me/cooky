import LinksNav from "./Linksnav";
import { Link } from 'react-router-dom'



function NavBar(){

    const logo = require('./resources/cooky-nav.png');

    return(
    <nav className="navbarcustom navbar">
        
        
        <Link to="/recipes" >
            <img src={logo} style={{maxHeight: 70}}/></Link>
        <LinksNav />
    </nav>
    );    

}

export default NavBar;
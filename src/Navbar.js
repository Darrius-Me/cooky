import LinksNav from "./Linksnav";



function NavBar(){

    const logo = require('./resources/cooky-nav.png');

    return(
    <nav className="navbar">
        
        <img src={logo} style={{maxHeight: 70}}/>
        <LinksNav />
    </nav>
    );    

}

export default NavBar;
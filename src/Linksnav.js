import { Link } from 'react-router-dom'

function LinksNav()
{
    
    return(
        <div className="links">
            <Link to="/" >Home</Link>
            <Link to="/transactions" >Transactions</Link>
            <Link to="/login" >Login</Link>
            <Link to="/register" >Register</Link>
        </div>
    );
}

export default LinksNav;
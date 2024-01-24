import { Link, useNavigate } from 'react-router-dom'

function LinksNav()
{
    const navigate = useNavigate();
    const userlogged = JSON.parse(sessionStorage.getItem("auth")).name;

    const doLogout = (e) => {
        e.preventDefault();
        sessionStorage.setItem('isLoggedIn', false);
        sessionStorage.removeItem('auth');
        navigate('/login')
    }
    
    return(
        <div className="links">
            {/* <Link to="/recipes" >Recipes</Link> */}
            Hello <b><u>{userlogged}</u></b>
            <button className='div-button' style={{marginLeft: 20}} onClick={doLogout}>Logout</button>
        </div>
    );
}

export default LinksNav;
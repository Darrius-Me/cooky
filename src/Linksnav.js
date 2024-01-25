import { useNavigate } from 'react-router-dom'

function LinksNav()
{
    const navigate = useNavigate();
    const userlogged = JSON.parse(sessionStorage.getItem("auth")).name;
    const userloggedadmin = JSON.parse(sessionStorage.getItem("auth")).isAdmin;
    console.log(userloggedadmin);
    console.log(typeof(userloggedadmin));

    const doLogout = (e) => {
        e.preventDefault();
        sessionStorage.setItem('isLoggedIn', false);
        sessionStorage.removeItem('auth');
        navigate('/login')
    }
    
    return(
        <div className="links" style={{color: 'white'}}>
            Hello <b><u>{userlogged}</u></b>
            {
                userloggedadmin && <button className='div-button-alternate' style={{marginLeft: 20}} onClick={doLogout}><b>User Management</b></button>
            }
            <button className='div-button-alternate' style={{marginLeft: 20}} onClick={doLogout}><b>Logout</b></button>
        </div>
    );
}

export default LinksNav;
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

function LoginPageInput(){
const [userinput, SetUser] = useState('');
const [passinput, SetPass] = useState('');

const [users, setUsers] = useState(null);

const logo = require('./resources/cooky.png');

const handlesubmit = (e) =>
{
    e.preventdefault();

    fetch('http://localhost:8000/users').then(
            res => { return res.json();}
    ).then( data => {
        setUsers(data);
        console.log(users);
        console.log('users');
    }, [])

}

    return(
        <div className="login-page">
            <div>
                <img src={logo} style={{maxHeight: 120, marginBottom: 100}}/>
            </div>
            <div className="forms">
                <form onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label htmlFor="inputuser">Email Address</label>
                        <input 
                            id="inputuser"
                            type="text" 
                            required
                            autoComplete="off"
                            onChange={(e) => SetUser(e.target.value)}></input>
                        <br></br>
                        <label htmlFor="inputpass">Password</label>
                        <input 
                            id="inputpass"
                            type="password"
                            required
                            onChange={(e) => SetPass(e.target.value)}>
                        </input>
                    </div>
                    
                    <button >Log in</button>

                    <div
                    style={{textAlign: "left"}}>
                    <p className="signup">Not yet registered? <Link to="../register"><u className="signup-link">SIGN UP NOW!</u></Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPageInput;
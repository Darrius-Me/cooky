import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";
import Cookies from 'js-cookie';

function LoginPageInput({setToken}){
    const [userinput, SetUser] = useState('');
    const [passinput, SetPass] = useState('');
    const [isValid, SetIsValid] = useState(false);
    const logo = require('../resources/cooky.png');

    const navigate = useNavigate();

    useEffect(() =>{
        const loggedin = sessionStorage.getItem('isLoggedIn');
        if (loggedin === 'true') {
            navigate('/recipes')
        }
        else {
            navigate('/login')
        }
    }, [])

    const authenticateUser = (useremail, password) => {        
        axios.get('http://localhost:8000/users')
        .then( result => {
            result.data.map(user => {
                if(user.email === useremail){
                    if(user.password === password){
                        sessionStorage.setItem('auth', JSON.stringify(user));
                        sessionStorage.setItem('isLoggedIn', true);
                        SetIsValid(true);
                    }
                }
            })
        }) 
    }

    const handlesubmit = async (e) =>
    {
        e.preventDefault();
        authenticateUser(userinput, passinput);
        console.log(isValid);
        if (isValid) {
           navigate('/recipes');
        }
        
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
                    
                    <button className="div-button round-edge" >Log in</button>

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
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import axios from 'axios'

function RegisterForm(){

    const [name, SetName] = useState('');
    const [namevalid, SetNameValid] = useState(false);

    const [email, SetUserName] = useState('');
    const [uservalid, SetUserValid] = useState(false);

    const [password, SetPassword] = useState('');
    const [pwdvalid, SetPwdValid] = useState(false);

    const [matchpass, SetMatch] = useState('');
    const [matchvalid, SetMatchValid] = useState(false);

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

    const handleRegister = (e) => {
        e.preventDefault();
        const isAdmin = false;
        const user = {name, email, password, isAdmin};

        axios.post('http://localhost:8000/users', user)
            .then( result => {
                alert("Registered Successfully")
                navigate('/login')
            })
        
    }

    useEffect(() => {
        const USER_REGEX = new RegExp('^[A-Za-z][A-Za-z]{3,25}$');
        const result = USER_REGEX.test(email);
        SetUserValid(result);
    }, [email]);

    useEffect(() =>{
        //const PASS_REGEX = new RegExp('^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');
        const PASS_REGEX = new RegExp('^[a-zA-Z0-9-]{8,}$');
        const result = PASS_REGEX.test(password);
        SetPwdValid(result);
    }, [password]);

    useEffect(() => {
        if (matchpass === password) {
            SetMatchValid(true);
        }
        else{
            SetMatchValid(false);
        }
    }, [password, matchpass]);

    return (
        <div className="signup-page">
            <p className="signup-header">Sign up to cooky</p>
            <div className="forms">
                <form onSubmit={handleRegister}>
                    
                    <label htmlFor="nameregister">Name</label>
                    <input
                        id="nameregister"
                        type="text"
                        autoComplete="off"
                        required
                        onChange={(e) => SetName(e.target.value)}
                    ></input>

                    <label htmlFor="userregister">Email Address</label>
                    <input
                        id="userregister"
                        type="text"
                        autoComplete="off"
                        required
                        onChange={(e) => SetUserName(e.target.value)}
                    ></input>
                    {!uservalid && email!=='' && <p className="inputerror">Invalid email!</p>}

                    <label htmlFor="pwdregister">Password</label>
                    <input
                        id="pwdregister"
                        type="password"
                        required
                        onChange={(e) => SetPassword(e.target.value)}
                    ></input>
                    {!pwdvalid && password!=='' && <p className="inputerror">Password must contain 8 characters!</p>}

                    <label htmlFor="matchregister">Repeat Password</label>
                    <input
                        id="matchregister"
                        type="password"
                        required
                        onChange={(e) => SetMatch(e.target.value)}
                    ></input>
                    {!matchvalid && matchpass!=='' && <p className="inputerror">Password does not match!</p>}

                    <button disabled={!uservalid || !pwdvalid ? true : false} className="div-button round-edge">Sign Up</button>


                    <div
                        style={{textAlign: "left"}}>
                        <p className="signup">Already have an account? <Link to="../login" ><u className="signup-link">Log In instead</u></Link></p>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default RegisterForm;
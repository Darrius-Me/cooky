import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PopUp from "../components/Popup";

function RegisterForm(){

    //variables for user form
    const [name, SetName] = useState('');
    const [email, SetUserName] = useState('');
    const [emailvalid, SetEmailValid] = useState(false);
    const [password, SetPassword] = useState('');
    const [pwdvalid, SetPwdValid] = useState(false);
    const [matchpass, SetMatch] = useState('');
    const [matchvalid, SetMatchValid] = useState(false);

    const navigate = useNavigate();

    //if user is already logged in, redirect to recipe list
    useEffect(() =>{
        const loggedin = sessionStorage.getItem('isLoggedIn');
        if (loggedin === 'true') {
            navigate('/recipes')
        }
    }, [navigate])

    //function for saving registered user to database, self registered users are automatically non admin
    const handleRegister = (e) => {
        e.preventDefault();
        const isAdmin = false;
        const user = {name, email, password, isAdmin};

        axios.post('http://localhost:8000/users', user)
            .then( result => {
                setOkayButtonPopup(true);
            })
        
    }

    //regex for validating email
    useEffect(() => {
        const USER_REGEX = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$');
        const result = USER_REGEX.test(email);
        SetEmailValid(result);
    }, [email]);

    //regex for validating password; must be at least 8 characters with only _ and . as special characters
    useEffect(() =>{
        const PASS_REGEX = new RegExp('^[a-zA-Z0-9-_.]{8,}$');
        const result = PASS_REGEX.test(password);
        SetPwdValid(result);
    }, [password]);

    //validate if passwords match
    useEffect(() => {
        if (matchpass === password) {
            SetMatchValid(true);
        }
        else{
            SetMatchValid(false);
        }
    }, [password, matchpass]);

    //variables for popup
    const [okaybuttonPopup, setOkayButtonPopup] = useState(false);
    const [isokayPopup, setIsOkayPopup] = useState(false);

    //navigate to userlist on clicking okay
    useEffect(() =>{
        if (isokayPopup) {
            navigate('/userlist')
        }
    }, [isokayPopup])

    return (
        <div className="signup-page">
            <p className="signup-header">Sign up to cooky</p>
            <div className="forms">
                {/* form for user register */}
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
                    {!emailvalid && email!=='' && <p className="inputerror">Invalid email!</p>}

                    <label htmlFor="pwdregister">Password</label>
                    <input
                        id="pwdregister"
                        type="password"
                        required
                        onChange={(e) => SetPassword(e.target.value)}
                    ></input>
                    {!pwdvalid && password!=='' && <p className="inputerror">Password must contain at least 8 characters. Only accepts _ and . special characters!</p>}

                    <label htmlFor="matchregister">Repeat Password</label>
                    <input
                        id="matchregister"
                        type="password"
                        required
                        onChange={(e) => SetMatch(e.target.value)}
                    ></input>
                    {!matchvalid && matchpass!=='' && <p className="inputerror">Password does not match!</p>}

                    <div style={{marginTop: 20, marginBottom: 20}}>
                        <button disabled={!emailvalid || !pwdvalid || !matchvalid ? true : false} className="div-button round-edge">Sign Up</button>
                    </div>
                </form>
                <div style={{textAlign: "left"}}>
                    <p className="signup">Already have an account? <Link to="../login" ><u className="signup-link">LOG IN INSTEAD</u></Link></p>
                </div>
            </div>
            {/* Pop ups for confirmations; trigger and setTrigger is for opening and closing of popup, setAction is for custom actions when yes is click on popup */}
            <PopUp isConfirm={true} trigger={okaybuttonPopup} setTrigger={setOkayButtonPopup} setAction={setIsOkayPopup}>
                <div className="popup-content">
                    <h1 className="alternate_font">Register Success</h1>
                    <p>The details of <b>{name}</b> has been registered.</p>
                </div>
            </PopUp>
        </div>
    );
}

export default RegisterForm;
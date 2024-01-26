import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreateUser(){

    const [name, SetName] = useState('');
    const [namevalid, SetNameValid] = useState(false);
    const [email, SetUserName] = useState('');
    const [uservalid, SetUserValid] = useState(false);
    const [password, SetPassword] = useState('');
    const [pwdvalid, SetPwdValid] = useState(false);
    const [matchpass, SetMatch] = useState('');
    const [matchvalid, SetMatchValid] = useState(false);
    const [isAdmin, SetIsAdmin] = useState(false);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
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

    const checkingbox = (e) => {
        const x = isAdmin;
        SetIsAdmin(!x);
    }

    const cancelbutton = (e) => {
        navigate('/userlist');
    }

    return (
        <div className="signup-page">
            <p className="signup-header">Add User</p>
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

                    <div className="contain">
                        <div style={{width: 100}}>
                            <label htmlFor="adminregister">Is Admin</label>
                        </div>
                        <div style={{marginBottom: 0, alignItems: "baseline"}}>
                            <input
                                id="adminregister"
                                type="checkbox"
                                onChange={checkingbox}
                                value={isAdmin}
                            ></input>
                        </div>
                    </div>
                    <div style={{justifyContent: "center", display: "flex"}}>
                        <button  className="inactive-button round-edge" style={{width: 200, marginTop: 50}} onClick={cancelbutton}>Cancel</button>
                        <button  className="div-button round-edge" style={{width: 200, marginTop: 50, marginLeft: 50}}>Add User</button>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default CreateUser;
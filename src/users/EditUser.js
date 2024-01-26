import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PopUp from "../components/Popup";

function EditUser(){

    const location = useLocation();

    const [name, SetName] = useState(location.state.user.name);
    const [email, SetUserName] = useState(location.state.user.email);
    const [emailvalid, SetEmailValid] = useState(false);
    const [password, SetPassword] = useState(location.state.user.password);
    const [pwdvalid, SetPwdValid] = useState(false);
    const [matchpass, SetMatch] = useState(location.state.user.password);
    const [matchvalid, SetMatchValid] = useState(false);
    const [isAdmin, SetIsAdmin] = useState(location.state.user.isAdmin);
    const userid = location.state.user.id;
    const user = {userid, name, email, password, isAdmin};

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/users/'+ userid, user)
            .then( result => {
                setOkayButtonPopup(true);
            })
    }

    useEffect(() => {
        const USER_REGEX = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$');
        const result = USER_REGEX.test(email);
        SetEmailValid(result);
    }, [email]);

    useEffect(() =>{
        const PASS_REGEX = new RegExp('^[a-zA-Z0-9-_.]{8,}$');
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

    const cancelbutton = () => {
        console.log(name);
        setBackButtonPopup(true)
    }

    const [backbuttonPopup, setBackButtonPopup] = useState(false);
    const [isbackPopup, setIsBackPopup] = useState(false);
    const [okaybuttonPopup, setOkayButtonPopup] = useState(false);
    const [isokayPopup, setIsOkayPopup] = useState(false);


    useEffect(() =>{
        if (isbackPopup) {
            navigate('/userlist')
        }
    }, [isbackPopup])

    useEffect(() =>{
        if (isokayPopup) {
            navigate('/userlist')
        }
    }, [isokayPopup])

    return (
        <div>
            <div className="useredit-page">
                <p className="signup-header">Edit User</p>
                <div className="forms">
                    <div>
                        
                        <label htmlFor="nameregister">Name</label>
                        <input
                            id="nameregister"
                            type="text"
                            autoComplete="off"
                            value={name}
                            required
                            onChange={(e) => SetName(e.target.value)}
                        ></input>

                        <label htmlFor="userregister">Email Address</label>
                        <input
                            id="userregister"
                            type="text"
                            autoComplete="off"
                            value={email}
                            required
                            onChange={(e) => SetUserName(e.target.value)}
                        ></input>
                        {!emailvalid && email!=='' && <p className="inputerror">Invalid email!</p>}

                        <label htmlFor="pwdregister">Password</label>
                        <input
                            id="pwdregister"
                            type="password"
                            value={password}
                            required
                            onChange={(e) => SetPassword(e.target.value)}
                        ></input>
                        {!pwdvalid && password!=='' && <p className="inputerror">Password must contain at least 8 characters. Only accepts _ and . special characters!</p>}

                        <label htmlFor="matchregister">Repeat Password</label>
                        <input
                            id="matchregister"
                            type="password"
                            value={matchpass}
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
                                    checked={isAdmin}
                                ></input>
                            </div>
                        </div>
                        <div style={{justifyContent: "center", display: "flex"}}>
                            <button  className="inactive-button round-edge" style={{width: 200, marginTop: 50}} onClick={cancelbutton}>Cancel</button>
                            <button 
                                disabled={!emailvalid || !pwdvalid || !matchvalid ? true : false} 
                                className="div-button round-edge" 
                                style={{width: 200, marginTop: 50, marginLeft: 50}} 
                                onClick={handleRegister}>
                                Save User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <PopUp isConfirm={false} trigger={backbuttonPopup} setTrigger={setIsBackPopup} setButton={setBackButtonPopup}>
                <div className="popup-content">
                    <h1 className="alternate_font">Cancel</h1>
                    <p>Are you sure you want to cancel editing <b>{name}</b>? Your progress will not be saved.</p>
                </div>
            </PopUp>

            <PopUp isConfirm={true} trigger={okaybuttonPopup} setTrigger={setIsOkayPopup} setButton={setOkayButtonPopup}>
                <div className="popup-content">
                    <h1 className="alternate_font">Save Success</h1>
                    <p>The details of <b>{name}</b> has been saved.</p>
                </div>
            </PopUp>
        </div>
        
    );
}

export default EditUser;
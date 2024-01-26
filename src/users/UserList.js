import { useState, useEffect } from "react";
import NavBar from "../Navbar";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import { Link } from "react-router-dom";

function UserList() {

    const [users, SetUsers] = useState(null);

    useEffect(() =>{
        fetch('http://localhost:8000/users').then(
            res => { return res.json();}
        ).then( data => {
            SetUsers(data.sort((r1, r2) => (r1.name < r2.name) ? 1 : (r1.name > r2.name) ? -1 : 0));
        })
    }, [])


    return (

        <div>
            <NavBar/>
            <div className="recipelist-page">
                <div>
                    <h1 className="alternate_font">Users</h1>
                </div>
                <div style={{marginTop: 40}}>
                    <Link to="/usercreate" className="div-button">Create New</Link>
                </div>
            </div>

            <div className="recipelist-page">
                <div className="" >
                    <div>
                        { users && 
                            users.map(user => (
                                
                                <div key={user.id} >
                                    <div className="recipe-preview-container"> 
                                        <div className="contain">
                                            <div className="namelabel-2"></div>
                                            <div>
                                                <h5 style={{color: "black"}}>{user.name}</h5>
                                            </div>
                                            {
                                                user.isAdmin ?
                                                (
                                                    <div className="contain" style={{display: "flex", marginLeft: 10}}>
                                                        <div className="namelabel-2"></div>
                                                        <h5>Admin</h5>
                                                    </div>
                                                ) : (<p></p>)
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    
                </div>
            </div>
        </div>
        
    );
}

export default UserList;

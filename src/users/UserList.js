import { useState, useEffect } from "react";
import NavBar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import PopUp from "../components/Popup";
import axios from 'axios'

function UserList() {

    //get info of logged user
    const userloggedid = JSON.parse(sessionStorage.getItem("auth")).id;
    const userloggedadmin = JSON.parse(sessionStorage.getItem("auth")).isAdmin;

    //return to recipe list if not an admin
    useEffect(() =>{
        if (!userloggedadmin) {
            navigate('/recipes')
        }
    }, [])

    //variables for user list and user to be deleted
    const [users, SetUsers] = useState(null);
    const [userdeleted, SetUserDeleted] = useState('');
    const [userdeletedid, SetUserDeletedId] = useState('');
    const navigate = useNavigate();

    //fetch data and sort data
    useEffect(() =>{
        fetch('http://localhost:8000/users').then(
            res => { return res.json();}
        ).then( data => {
            SetUsers(data.sort((r1, r2) => (r1.name > r2.name) ? 1 : (r1.name < r2.name) ? -1 : 0));
        })
    })

    //Variables for popups
    const [deletebuttonPopup, setDeleteButtonPopup] = useState(false);
    const [isdeletePopup, setIsDeletePopup] = useState(false);
    const [okaybuttonPopup, setOkayButtonPopup] = useState(false);
    const [isokayPopup, setIsOkayPopup] = useState(false);

    const handleDelete = (username, userid) => {
        SetUserDeleted(username);
        SetUserDeletedId(userid);
        setDeleteButtonPopup(true)
    }

    // on delete, trigger okay popup and close delete popup
    const deleteUser = () => {
        axios.delete('http://localhost:8000/users/' + userdeletedid)
        .then( result => {
            setOkayButtonPopup(true);
        })
        .catch( e => console.log(e))

        setOkayButtonPopup(true);
    }

    //if okay popup is triggered yes
    useEffect(() =>{
        if (isokayPopup) {
            navigate('/userlist')
        }
    }, [isokayPopup])

    //if delete popup is triggered yes
    useEffect(() =>{
        if (isdeletePopup) {
            deleteUser();
        }
    }, [isdeletePopup])

    return (
        <div>
            <NavBar/>
            <div className="userlist-page">
                <div>
                    {/* header for the user list page */}
                    <div>
                        <Link to="/recipes" ><p style={{color: "gray", fontWeight: "bold"}}>← Back to Feed</p></Link>
                        <h1 className="alternate_font">Users</h1>
                    </div>
                    <div style={{marginTop: 40, marginBottom: 50}}>
                        <Link to="/usercreate" className="div-button">Create New</Link>
                    </div>
                </div>
                <div>
                    {/* user table */}
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Is Admin</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody className="table-content">
                            { users && 
                                users.map(user => (
                                    <tr key={user.id} >
                                        <td>
                                            {user.name}
                                        </td>
                                        <td>
                                            {user.email}
                                        </td>
                                        <td>
                                            {
                                                user.isAdmin ? ("Yes") : ("") //disoplay yes if admin
                                            }
                                        </td>
                                        <td>
                                            {/* redirects to user edit page and sends user objects for details */}
                                            <Link 
                                                to="/useredit"
                                                state={{user: user}}
                                                >
                                                <div className="div-button round-edge">Edit</div>
                                            </Link>
                                            {
                                                // delete button is only visible if current user is not the logged user
                                                user.id === userloggedid ? ("") : (<button className="div-button round-edge" style={{marginLeft: 20}} onClick={() => handleDelete(user.name,user.id)}>Delete</button>)
                                            }
                                        </td>
                                    </tr>                                    
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Pop ups for confirmations; trigger and setTrigger is for opening and closing of popup, setAction is for custom actions when yes is click on popup */}
            <PopUp isConfirm={false} trigger={deletebuttonPopup} setTrigger={setDeleteButtonPopup} setAction={setIsDeletePopup}>
                <div className="popup-content">
                    <h1 className="alternate_font">Delete User?</h1>
                    <p>Are you sure you want to delete <b>{userdeleted}</b>?</p>
                    <p>There is no turning back.</p>
                </div>
            </PopUp>

            <PopUp isConfirm={true} trigger={okaybuttonPopup} setTrigger={setOkayButtonPopup} setAction={setIsOkayPopup}>
                <div className="popup-content">
                    <h1 className="alternate_font">Deleted</h1>
                    <p>The <b>{userdeleted}</b> has been removed from the system.</p>
                </div>
            </PopUp>
        </div>
        
    );
}

export default UserList;

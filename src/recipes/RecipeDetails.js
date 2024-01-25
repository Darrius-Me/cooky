import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from "../Navbar";
import PopUp from "../components/Popup";

function RecipeDetails() {
    
    //session variables
    const userloggedadmin = JSON.parse(sessionStorage.getItem("auth")).isAdmin;
    const userloggedid = JSON.parse(sessionStorage.getItem("auth")).id;
    const navigate = useNavigate();
    
    //variables for recipe details
    const location = useLocation();
    const recipename = location.state.recipe.recipename;
    const serving = location.state.recipe.serving;
    const preparation = location.state.recipe.preparation;
    const ingredients = location.state.recipe.ingredients;
    const procedure = location.state.recipe.procedure;
    const image = location.state.recipe.image;
    const author = location.state.recipe.author;
    const authorid = location.state.recipe.authorid;
    const id = location.state.recipe.id;
    const recipe = {id, recipename, serving, preparation, ingredients, procedure, image, author, authorid};

    //Variables for popups
    const [deletebuttonPopup, setDeleteButtonPopup] = useState(false);
    const [isdeletePopup, setIsDeletePopup] = useState(false);
    const [okaybuttonPopup, setOkayButtonPopup] = useState(false);
    const [isokayPopup, setIsOkayPopup] = useState(false);

    //set background style for header
    var divStyle = {
        backgroundImage: 'url(' + image + ')',
    };

    // on delete, trigger okay popup and close delete popup
    const deleteRecipe = () => {
        axios.delete('http://localhost:8000/recipes/' + id)
        .then( result => {
            setOkayButtonPopup(true);
        })
        .catch( e => console.log(e))

        setOkayButtonPopup(true);
    }

    //if okay popup is triggered yes
    useEffect(() =>{
        if (isokayPopup) {
            navigate('../recipes')
        }
    }, [isokayPopup])

    //if delete popup is triggered yes
    useEffect(() =>{
        if (isdeletePopup) {
            deleteRecipe();
        }
    }, [isdeletePopup])


    return(

        <div>
            <NavBar/>
            <div className="view-info setbackground" style={divStyle}>
                <div className="view-page-foreground view-page">
                    <div style={{paddingBottom: 150}}>
                        <Link to="/recipes" ><p style={{color: "white", fontWeight: "bold"}}>← Back to Feed</p></Link>
                    </div>
                    
                    {/* header details */}
                    <h1 className="alternate_font" style={{color: "white"}}>{recipename}</h1>
                    <p style={{color: "white"}}>by {author}</p>
                    <div className="contain">
                        <div className="contain" style={{width: 300}}>
                            <div className="one details-info">
                                <p>{serving} servings</p>
                            </div>
                            <div className="two details-info">
                                <p>{preparation}</p>
                            </div>
                        </div>

                        {/* buttons visible if user created or admin user */}
                        {
                            (userloggedid === authorid || userloggedadmin === true) &&
                            <div className="details-admin">
                                <button className="div-button round-edge right-align" style={{marginLeft: 20}} onClick={() => setDeleteButtonPopup(true)}>Delete</button>
                                <Link 
                                    to="/recipes/edit"
                                    state={{recipe: recipe}}
                                    >
                                    <div className="div-button-alternate round-edge right-align">Edit</div>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/* content details */}
            <div className="view-page">
                <div className="contain">
                    <div className="ingredients-wrapper">
                        <h1 className="alternate_font">Ingredients</h1>
                        <div dangerouslySetInnerHTML={{__html: ingredients}} style={{marginTop: 40}}></div>
                    </div>
                    <div className="procedure-wrapper">
                        <h1 className="alternate_font">Procedure</h1>
                        <div dangerouslySetInnerHTML={{__html: procedure}} style={{marginTop: 40}}></div>
                    </div>
                </div>
            </div>
            
            {/* Popup configuration */}
            <PopUp isConfirm={false} trigger={deletebuttonPopup} setTrigger={setIsDeletePopup} setButton={setDeleteButtonPopup}>
                <div className="popup-content">
                    <h1 className="alternate_font">Delete Recipe?</h1>
                    <p>Are you sure you want to delete the recipe for <b>{recipename}</b>?</p>
                    <p>There is no turning back.</p>
                </div>
            </PopUp>

            <PopUp isConfirm={true} trigger={okaybuttonPopup} setTrigger={setIsOkayPopup} setButton={setOkayButtonPopup}>
                <div className="popup-content">
                    <h1 className="alternate_font">Deleted</h1>
                    <p>The recipe for <b>{recipename}</b> has been deleted.</p>
                </div>
            </PopUp>
        </div>   
    );
}

export default RecipeDetails;
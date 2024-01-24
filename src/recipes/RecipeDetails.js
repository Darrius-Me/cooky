import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import NavBar from "../Navbar";



function RecipeDetails() {
    
    const userloggedadmin = JSON.parse(sessionStorage.getItem("auth")).isAdmin;
    console.log(userloggedadmin);
    const userloggedid = JSON.parse(sessionStorage.getItem("auth")).id;
    
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
    const recipe = {id, recipename, serving, preparation, ingredients, procedure, image, author};


    var divStyle = {
        backgroundImage: 'url(' + image + ')',
      };
    
    return(

        <div>
            <NavBar/>
            <div className="view-info setbackground" style={divStyle}>
                <div className="view-page-foreground view-page">
                    <div style={{paddingBottom: 150}}>
                        <Link to="/recipes" ><p style={{color: "white", fontWeight: "bold"}}>← Back to Feed</p></Link>
                    </div>
                    

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

                        {
                            (userloggedid === authorid || userloggedadmin === true) &&
                            <div className="details-admin">
                                <Link to="/recipes/create"><div className="div-button round-edge right-align" style={{marginLeft: 20}}>Delete</div></Link>
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
            
        </div>

        

        
    );
}

export default RecipeDetails;
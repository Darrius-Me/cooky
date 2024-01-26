import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import NavBar from "../Navbar";
import HomeScreen from "../Homescreen";



function RecipeLists() {
    
    //session variables
    const userlogged = JSON.parse(sessionStorage.getItem("auth")).name;
    const userloggedid = JSON.parse(sessionStorage.getItem("auth")).id;
    const userloggedadmin = JSON.parse(sessionStorage.getItem("auth")).isAdmin;

    //recipe list variabes
    const [ownrecipes, SetOwnRecipes] = useState(null);
    const [otherrecipes, SetOtherRecipes] = useState(null);
    const [allrecipes, SetAllRecipes] = useState(null);
   
    //fetching recipes from JSON server, then fetching and sorting
    useEffect(() =>{
        fetch('http://localhost:8000/recipes').then(
            res => { return res.json();}
        ).then( data => {
            const filteredown = data.filter(recipe => recipe.authorid.includes(userloggedid));
            const filteredother = data.filter(recipe => !recipe.authorid.includes(userloggedid));
            SetOwnRecipes(filteredown.sort((r1, r2) => (r1.recipename > r2.recipename) ? 1 : (r1.recipename < r2.recipename) ? -1 : 0));
            SetOtherRecipes(filteredother.sort((r1, r2) => (r1.recipename > r2.recipename) ? 1 : (r1.recipename < r2.recipename) ? -1 : 0));
            SetAllRecipes(data.sort((r1, r2) => (r1.recipename > r2.recipename) ? 1 : (r1.recipename < r2.recipename) ? -1 : 0));
        })
    }, [userloggedid])
        
    //paging variables
    const [clickpage, SetClickOwn] = useState(1);
    //sets css classes for active button
    const ownbutton = clickpage === 1 ? "div-button": "inactive-button";
    const othersbutton = clickpage === 2 ? "div-button": "inactive-button";
    const allbutton = clickpage === 3 ? "div-button": "inactive-button";

    //setting pages
    const clickownpage = (e) => {
        SetClickOwn(1)
    }

    const clickotherpage = (e) => {
        SetClickOwn(2);
    }

    const clickallpage = (e) => {
        SetClickOwn(3);
    }

    return(
        <div>
            <NavBar/>
            <div className="recipelist-page">
                {/* header of recipe list page */}
                <div>
                    <h1 className="alternate_font">Hi, {userlogged}</h1>
                    <h5>This is your Recipes Collection.</h5>
                </div>
                <div className="contain" style={{marginTop: 40}}>
                    <div className="one">
                        {/* button for setting pages */}
                        <button className={ownbutton} onClick={clickownpage} style={{marginRight:20, width: 200}}>Own Recipe</button>
                        <button className={othersbutton} onClick={clickotherpage} style={{marginRight:20, width: 200}}>Other's Recipe</button>
                        {/* All recipe page is only visible to admin users */}
                        {
                            userloggedadmin === true && <button className={allbutton} onClick={clickallpage} style={{marginRight:20, width: 200}}>All Recipe</button>
                        }
                        
                    </div>
                    <div className="two" style={{textAlign: "right"}}>
                        <Link to="/recipes/create"><div className="div-button round-edge">New Recipe</div></Link>
                    </div>
                </div>

                {/* switch case for setting pages depending on what the user clicked on the button above */}
                {(() => {
                    switch (clickpage) {
                    case 1:
                        return <div className="recipelist" >
                                    { ownrecipes && 
                                        ownrecipes.map(recipe => (
                                            <div key={recipe.id} >
                                                {/* recipe is clickable and sends the recipe object to details page */}
                                                <Link 
                                                    to={'/recipes/details'}
                                                    state={{recipe: recipe}}
                                                >
                                                    <div className="recipe-preview-container"> 
                                                        <div className="recipe-preview" style={{backgroundImage: 'url(' + recipe.image + ')'}}>
                                                        
                                                        </div>
                                                        <div className="contain">
                                                            <div className="namelabel"></div>
                                                            <h5 style={{color: "black"}}>{ recipe.recipename }</h5>
                                                        </div>
                                                    </div>
                                                    
                                                </Link>
                                            </div>                                            
                                        ))
                                    }
                                </div>
                    case 2:
                        return <div className="recipelist" >
                                    { otherrecipes && 
                                        otherrecipes.map(recipe => (                                            
                                            <div key={recipe.id} >
                                                {/* recipe is clickable and sends the recipe object to details page */}
                                                <Link 
                                                    to={'/recipes/details'}
                                                    state={{recipe: recipe}}
                                                >
                                                    <div className="recipe-preview-container"> 
                                                        <div className="recipe-preview" style={{backgroundImage: 'url(' + recipe.image + ')'}}>
                                                        
                                                        </div>
                                                        <div className="contain">
                                                            <div className="namelabel"></div>
                                                            <h5 style={{color: "black"}}>{ recipe.recipename }</h5>
                                                        </div>
                                                    </div>                                                    
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                    case 3:
                        return <div className="recipelist" >
                                    { allrecipes && 
                                        allrecipes.map(recipe => (                                            
                                            <div key={recipe.id} >
                                                {/* recipe is clickable and sends the recipe object to details page */}
                                                <Link 
                                                    to={'/recipes/details'}
                                                    state={{recipe: recipe}}
                                                >
                                                    <div className="recipe-preview-container"> 
                                                        <div className="recipe-preview" style={{backgroundImage: 'url(' + recipe.image + ')'}}>
                                                        
                                                        </div>
                                                        <div className="contain">
                                                            <div className="namelabel"></div>
                                                            <h5 style={{color: "black"}}>{ recipe.recipename }</h5>
                                                        </div>
                                                    </div>                                                    
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                    default:
                        return null
                    }
                })()}
            </div>
        </div>
        
    );
}

export default RecipeLists;
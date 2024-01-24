import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import NavBar from "../Navbar";



function RecipeLists() {
    
    const [ownrecipes, SetOwnRecipes] = useState(null);
    const [allrecipes, SetAllRecipes] = useState(null);
    const userlogged = JSON.parse(sessionStorage.getItem("auth")).name;
    const userloggedid = JSON.parse(sessionStorage.getItem("auth")).id;
    
    const navigate = useNavigate();

    
    useEffect(() =>{
        fetch('http://localhost:8000/recipes').then(
            res => { return res.json();}
        ).then( data => {
            console.log(data);
            const filtered = data.filter(recipe => recipe.authorid.includes(userloggedid));
            SetOwnRecipes(filtered);
            // ownrecipes.sort((a,b) => a.recipename > b.recipename ? 1:-1);
            SetAllRecipes(data);
        })
    }, [])
        
    return(
        <div>
            <NavBar/>
            <div className="recipelist-page">
                <div>
                    <h1 className="alternate_font">Hi, {userlogged}</h1>
                    <h5>This is your Recipes Collection.</h5>
                </div>
                <div className="contain">
                        <div className="one">
                            <button className="div-button">Own Recipe</button>
                        </div>
                        <div className="two" style={{textAlign: "right"}}>
                            <Link to="/recipes/create"><div className="div-button round-edge">New Recipe</div></Link>
                        </div>
                    </div>

                <div className="recipelist">
                    { ownrecipes && 
                        ownrecipes.map(recipe => (
                             <Link 
                                to={'/recipes/details'}
                                state={{recipe: recipe}}
                            >
                                <div className="recipe-preview-container">
                                    <div className="recipe-preview" key={recipe.id} style={{backgroundImage: 'url(' + recipe.image + ')'}}>
                                    
                                    </div>
                                    <div>
                                        <h2>{ recipe.recipename }</h2>
                                    </div>
                                </div>
                                
                             </Link>
                                
                        ))
                    }
                </div>
                
                <div className="recipelist">
                    { allrecipes && 
                        allrecipes.map(recipe => (
                            <Link 
                                to={'/recipes/details'}
                                state={{recipe: recipe}}
                            >
                                <div className="recipe-preview-container">
                                    <div className="recipe-preview" key={recipe.id} style={{backgroundImage: 'url(' + recipe.image + ')'}}>
                                    
                                    </div>
                                    <div>
                                        <h2>{ recipe.recipename }</h2>
                                    </div>
                                </div>
                                
                            </Link>
                                
                        ))
                    }
                </div>
            </div>
        </div>
        
    );
}

export default RecipeLists;
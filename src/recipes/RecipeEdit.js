import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import NavBar from "../Navbar";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';




function RecipeEdit() {

    const location = useLocation();

    const [recipename, SetRecipeName] = useState(location.state.recipe.recipename);
    const [serving, SetServing] = useState(location.state.recipe.serving);
    const [preparation, SetPreparation] = useState(location.state.recipe.preparation);
    const [ingredients, SetIngredients] = useState(location.state.recipe.ingredients);
    const [procedure, SetProcedure] = useState(location.state.recipe.procedure);
    const [image, SetImage] = useState(location.state.recipe.image);
    const [author, SetAuthor] = useState(location.state.recipe.author);
    const [id, SetId] = useState(location.state.recipe.id);

    const navigate = useNavigate();

    




    const handleCreate = (e) => {
        e.preventDefault();
        SetAuthor("Darrius");
        const recipe = {id, recipename, serving, preparation, ingredients, procedure, image, author};
        
        console.log(id)
        axios.put('http://localhost:8000/recipes/' + id, recipe)
        .then( result => {
            console.log("Saved Successfully!");
            navigate('./recipes')
        })
        .catch( e => console.log(e))
    }

    const savefile = async (e) => {
        try {
            const file = e.target.files[0];
            const base64 = await convertBase64(file);
            console.log(base64);

            SetImage(base64);    
        } catch (error) {
            SetImage(null);
        }
        
    }

    const convertBase64 = (file) => {
        return new Promise(( resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            }

            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    var divStyle = {
        backgroundImage: 'url(' + image + ')',
    };

    return(
        <div>
            <NavBar/>
            <div className="edit-page-background" style={divStyle}>
                <div className="edit-page edit-page-foreground">
                    <Link to="/recipes" ><p style={{color: "gray", fontWeight: "bold"}}>← Back to Feed</p></Link>

                    <h1 className="alternate_font" style={{marginBottom: 30}}>New Recipe</h1>

                    <form className="forms" onSubmit={handleCreate}>
                        <label>Recipe Name</label>
                        <input required value={recipename}  onChange={(e) => SetRecipeName(e.target.value)}></input>
                        <div className="contain">
                            <div className="one">
                                <label>Number of Servings</label>
                                <input required value={serving} onChange={(e) => SetServing(e.target.value)} type="number"></input>
                            </div>
                            <div className="two">
                                <label>Preparation Time</label>
                                <input required value={preparation}  onChange={(e) => SetPreparation(e.target.value)} type="time"></input>
                            </div>
                        </div>
                        
                        <label>Main Image</label>
                        <input onChange={savefile} type="file"></input>
                        
                        
                        
                        <label>Ingredients</label>
                        <CKEditor
                        editor={ ClassicEditor }
                        data={ingredients}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            SetIngredients(data);
                        } }
                        />
                        
                        

                        <label>Procedure</label>
                        <CKEditor
                        editor={ ClassicEditor }
                        data={procedure}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            SetProcedure(data);
                        } }
                        />

                        <button type="submit" className="div-button round-edge" style={{marginTop: 20}}>Publish Recipe</button>
                    </form>
                </div>
            </div>
            
        </div>
        
    );
}

export default RecipeEdit;
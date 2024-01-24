import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from "../Navbar";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';




function RecipeCreate() {


    const [recipename, SetRecipeName] = useState('');
    const [serving, SetServing] = useState(1);
    const [preparation, SetPreparation] = useState('');
    const [ingredients, SetIngredients] = useState('');
    const [procedure, SetProcedure] = useState('');
    const [image, SetImage] = useState(null);
    const author = JSON.parse(sessionStorage.getItem("auth")).name;
    const authorid = JSON.parse(sessionStorage.getItem("auth")).id;
    const navigate = useNavigate();


    const handleCreate = (e) => {
        e.preventDefault();
        const recipe = {recipename, serving, preparation, ingredients, procedure, image, author, authorid};
        
        axios.post('http://localhost:8000/recipes', recipe)
        .then( result => {
            console.log("Saved Successfully!");
            navigate('../recipes')
        })
        .catch( e => {
            console.log(e);
        })
    }

    const savefile = async (e) => {
        try {
            const file = e.target.files[0];
            const base64 = await convertBase64(file);
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

    return(
        <div>
            <NavBar/>
            <div className="create-page">
                <Link to="/recipes" ><p style={{color: "gray", fontWeight: "bold"}}>← Back to Feed</p></Link>

                <h1 className="alternate_font" style={{marginBottom: 30}}>New Recipe</h1>

                <form className="forms" onSubmit={handleCreate}>
                    <label>Recipe Name</label>
                    <input required onChange={(e) => SetRecipeName(e.target.value)}></input>
                    <div className="contain">
                        <div className="one">
                            <label>Number of Servings</label>
                            <input required onChange={(e) => SetServing(e.target.value)} type="number"></input>
                        </div>
                        <div className="two">
                            <label>Preparation Time</label>
                            <input required onChange={(e) => SetPreparation(e.target.value)} type="time"></input>
                        </div>
                    </div>
                    
                    <label>Main Image</label>
                    <input required onChange={savefile} type="file"></input>
                    
                    
                    
                    <label>Ingredients</label>
                    <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        SetIngredients(data);
                    } }
                    />
                    
                    

                    <label>Procedure</label>
                    <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        SetProcedure(data);
                    } }
                    />

                    <button type="submit" className="div-button round-edge" style={{marginTop: 20}}>Publish Recipe</button>
                </form>
            </div>
        </div>
        
    );
}

export default RecipeCreate;
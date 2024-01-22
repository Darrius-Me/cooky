import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'


function TransactionCreate() {
    const [name, SetName] = useState('');
    const [age, SetAge] = useState('');
    const [description, SetDesc] = useState('');
    const navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault();
        const bear = {name, age, description};

        fetch('http://localhost:8000/bears', {
            method: 'POST',
            header: { 'Content-Type': "application/json"},
            body: JSON.stringify(bear)
        }).then(() => {
            navigate('/transactions')
        })
            
        
    }

    return(
        <div className="forms">
            <form onSubmit={handleCreate}>
                <label>Name</label>
                <input required onChange={(e) => SetName(e.target.value)}></input>
                <label>Age</label>
                <input required onChange={(e) => SetAge(e.target.value)} type="number"></input>
                <label>Description</label>
                <textarea style={{resize: 'none'}} rows={4} onChange={(e) => SetDesc(e.target.value)}></textarea>
                
                <Link to="/transactions" >Cancel</Link>
                <button style={{marginLeft: 20}} type="submit">Submit</button>
            </form>
        </div>
    );
}

export default TransactionCreate;
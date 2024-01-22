import { useEffect, useState } from "react";
import TransactionTable from "./TransactionTable";
import { Link } from 'react-router-dom'



function TransactionLists() {
    const [bears, setBears] = useState(null);

    useEffect(() =>{
        fetch('http://localhost:8000/bears').then(
            res => { return res.json();}
        ).then( data => {
            setBears(data);
        })
    }, [])

    return(
        <div style={{marginTop: 20}}>
            {bears && <TransactionTable bears={bears}/>}
            <Link to="/transactions/create" >Add New</Link>
        </div>
    );
}

export default TransactionLists;
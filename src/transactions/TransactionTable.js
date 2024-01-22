
import { Link, useNavigate } from 'react-router-dom'

function TransactionTable({bears}) {

    const navigate = useNavigate();

    const handleDelete = (id) => {
        console.log(id)
        fetch('http://localhost:8000/bears/' + id, {
            method: 'DELETE',
        }).then(() => {
            navigate('/')
        })
    }

    return(
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            Name
                        </th>
                        <th scope="col">
                            Age
                        </th>
                        <th scope="col">
                            Description
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {bears.map((bear) => (
                    <tr key={bear.id}>
                        <td scope="col">
                            {bear.id} - {bear.name}
                        </td>
                        <td scope="col">
                            {bear.age}
                        </td>
                        <td>
                            {bear.description}
                        </td>
                        <td>
                            <button onClick={() => handleDelete(bear.id)}>DELETE</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                
            </table>

        </div>
    )
}

export default TransactionTable;
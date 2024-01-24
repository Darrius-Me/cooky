import './App.css';
import './bootstrap.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginPageInput from './users/Login';
import HomeScreen from './Homescreen';
import RegisterForm from './users/Register';
import TransactionLists from './transactions/TransactionList';
import TransactionCreate from './transactions/TransactionCreate';
import RecipeCreate from './recipes/RecipeCreate';
import RecipeLists from './recipes/RecipeList';
import RecipeDetails from './recipes/RecipeDetails';
import RecipeEdit from './recipes/RecipeEdit';



function App() {

  


  return (
    <div className="App">
      <Router>
          
          <Routes>
            <Route exact path='/' element={<HomeScreen/>}/>
            <Route exact path='/transactions' element={<TransactionLists/>}/>
            <Route exact path='/recipes' element={<RecipeLists/>}/>
            <Route exact path='/recipes/create' element={<RecipeCreate/>}/>
            <Route exact path='/recipes/edit' element={<RecipeEdit/>}/>
            <Route exact path='/recipes/details' element={<RecipeDetails/>}/>
            <Route exact path='/transactions/create' element={<TransactionCreate/>}/>
            <Route exact path='/login' element={<LoginPageInput/>}/>
            <Route exact path='/register' element={<RegisterForm/>}/>
          </Routes>
      </Router>
      

    </div>
  );
}

export default App;

import './App.css';
import './bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPageInput from './users/Login';
import HomeScreen from './Homescreen';
import RegisterForm from './users/Register';
import RecipeCreate from './recipes/RecipeCreate';
import RecipeLists from './recipes/RecipeList';
import RecipeDetails from './recipes/RecipeDetails';
import RecipeEdit from './recipes/RecipeEdit';
import NotFound from './NotFound';
import CreateUser from './users/CreateUser';
import UserList from './users/UserList';
import EditUser from './users/EditUser';

function App() {


  return (
    <div className="App">
      <Router>
          
          <Routes>
            <Route exact path='/' element={<HomeScreen/>}/>
            <Route exact path='*' element={<NotFound/>}/>
            <Route exact path='/recipes' element={<RecipeLists/>}/>
            <Route exact path='/recipes/create' element={<RecipeCreate/>}/>
            <Route exact path='/recipes/edit' element={<RecipeEdit/>}/>
            <Route exact path='/recipes/details' element={<RecipeDetails/>}/>
            <Route exact path='/login' element={<LoginPageInput/>}/>
            <Route exact path='/register' element={<RegisterForm/>}/>
            <Route exact path='/usercreate' element={<CreateUser/>}/>
            <Route exact path='/useredit' element={<EditUser/>}/>
            <Route exact path='/userlist' element={<UserList/>}/>
          </Routes>
      </Router>
      

    </div>
  );
}

export default App;

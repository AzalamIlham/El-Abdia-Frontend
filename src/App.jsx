import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Signup from './Components/SignUp'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Stock from './Components/Stock';
import AddCategorie from './Components/AddCategorie';
import Categorie from './Components/Categorie';
import AddStock from './Components/AddStock';
import EditerStock from './Components/EditerStock';
import AdminInfo from './Components/About';


function App() {

  return (
    <BrowserRouter>
      <Routes>
  <Route path='/' element={<Login />} />
  <Route path='/adminlogin' element={<Login />} />
  <Route path='/signup' element={<Signup />} /> 
  <Route path='/dashboard' element={<Dashboard />}>
    <Route index element={<Home />} /> 
    <Route path='stock' element={<Stock />} />
    <Route path='category' element={<Categorie />} />
    <Route path='adminInfo' element={<AdminInfo />} />
    <Route path='add_category' element={<AddCategorie />} />
    <Route path='add_stock' element={<AddStock />} />
    <Route path='editer_stock/:id' element={<EditerStock />} />
  </Route>
</Routes>

    </BrowserRouter>
  );
  
}

export default App;

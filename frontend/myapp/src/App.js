import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Detailspost from './components/Detailspost';
import Signup from './components/Signup';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import {useState,useEffect} from 'react'

import AuthContext from './store/auth-context';

function App() {

  const [logIn,setLogIn] = useState(false);
  
  

  useEffect(() =>{
    const token = localStorage.getItem('access_token');
    const state = localStorage.getItem('isLogIn');
    if (token && state === 'true') {
      setLogIn(true);
      
    }
  },[logIn])


  return (
   
    <div className="App">
       <AuthContext.Provider value={{isLoggedIn:logIn}}>
      <BrowserRouter>
     
     <Routes>
     
     
     <Route path="/" element={<Home />} />
     <Route path="/:slug" element={<Detailspost />}/> 
      

      <Route path="/login" element={<Login name="Login" logIn={logIn} setLogIn={setLogIn} />} />
      <Route path="/signup" element={<Signup name="Signup" />} />
     
      </Routes>
     </BrowserRouter>
     </AuthContext.Provider>
    </div>
    
    
  );
}

export default App;



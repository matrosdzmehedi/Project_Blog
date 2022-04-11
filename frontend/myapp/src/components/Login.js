import React ,{useState} from 'react'
import axiosInstance from '../axiosInstance'
import {useNavigate} from 'react-router-dom';



export default function Login(props) {

  const forward = useNavigate();
  const logIn = props.logIn;
  const setLogIn = props.setLogIn;
 

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const submitHandler = (e)=> {

     e.preventDefault();

     const data = Object.freeze({
      username: inputs.username, 
      password: inputs.password
    })
    axiosInstance.post(`api/token/`,{...data})
   .then((res)=>{
   
    localStorage.setItem('access_token',res.data.access);
     localStorage.setItem('refresh_token',res.data.access);
      localStorage.setItem('isLogIn','true');
     axiosInstance.defaults.headers['Authorization']= 'JWT ' + localStorage.getItem('access_token')
     setLogIn(true);
     forward('/');
     })
     .catch((error) => {console.log(error.response.data)})
  
 
  

  }
  return (
    <div className="container">
    <div className="row">
        <div>
            <h2>{props.name} Form</h2>
        </div>
    <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={inputs.username || ""}  onChange={handleChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={inputs.password || ""}  onChange={handleChange}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" id='submit' className="btn btn-primary" onClick={submitHandler}>Submit</button>
</form>
</div>
</div>
  )
}

import React ,{useState} from 'react'
import axiosInstance from '../axiosInstance'
import {useNavigate} from 'react-router-dom';



export default function Login(props) {

  const forward = useNavigate();
 

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
      email: inputs.email,
      password: inputs.password
    })
    axiosInstance.post(`api/public/create-user/`,{...data})
   .then((res)=>{forward('/login')})
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
    <label for="exampleInputEmail1" className="form-label">Username</label>
    <input type="name" name="username" className="form-control" id="exampleInputName" aria-describedby="Username" value={inputs.username || ""}  onChange={handleChange}/>
    <div id="nameHelp" className="form-text">We'll never share your username with anyone else.</div>
  </div>

  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={inputs.email || ""}  onChange={handleChange}/>
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

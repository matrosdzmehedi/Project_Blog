import React ,{useState,useEffect}from 'react'
import axiosInstance from '../axiosInstance'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../store/auth-context';


export default function Comment() {

  const [inputs, setInputs] = useState({});
  const { slug } = useParams();
  const [data,setData] = useState([]);
  const [val,setVal] = useState(0);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const submitHandler = (e)=> {

     e.preventDefault();

     const data = Object.freeze({
      body: inputs.comment,
      slug: slug
    })
    axiosInstance.post(`/api/auth/new-comment/`,{...data})
   .then((res)=>{console.log(res.data)
    setInputs({comment:''})
    setVal(val+1)
    
   })
   .catch((error) => {console.log(error.response.data)})
 
  

  }
    
        useEffect(() =>{
          axios.get(`http://localhost:8000/api/public/comments/${slug}/`)
            .then(res => {
                setData(res.data);
                
            })
         
          
        },[val]);

  return (

    <AuthContext.Consumer>
      {(ctx)=>{
        return(
          <div style={{paddingTop:'15px'}}>
                <h5>  {data.length} comments </h5>

            {ctx.isLoggedIn && <div >  

<form >

<textarea rows="4" cols="50" name="comment" form="usrform" value={inputs.comment || ""}  onChange={handleChange}>Enter comment here...</textarea>
        
         
<p> <button onClick={submitHandler} style={{backgroundColor:'#0095ff',color:'white'}}>Comment </button></p>
</form>

</div>}

              <div>

              { data.map(i =>
              <div className="card-body" style={{border:'2px dotted'}}>
              <h5 className="card-title"> {i.commented_by}</h5>
              <p className="card-text">{i.body}</p>
              </div>
                )}
              </div>
              </div>
        )
      }}

    
              </AuthContext.Consumer>
  )
}

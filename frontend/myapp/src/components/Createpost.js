import React ,{useState,useRef} from 'react'
import axiosInstance from '../axiosInstance'


export default function Createpost(props) {
    const setCheck = props.setCheck;
    const check = props.check;
    

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState();
    const ref = useRef();

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }
    const submitHandler = (e)=> {
  
       e.preventDefault();
      if ((inputs.title) === undefined || (inputs.description) === undefined ||  (file) === undefined ){
        alert('Please enter all the fields');
      }
      else {
        const formData = new FormData();
         formData.append('title',inputs.title);
         formData.append('image', file);
         formData.append('description', inputs.description);
     

      axiosInstance.post(`/api/auth/new-post/`,formData)
     .then((res)=>{console.log(res.data)
        setInputs({title:'',description:''})
        ref.current.value = "";
        setCheck(check+1);
     })
     .catch((error) => {console.log(error)})
      }
         
    
  }
          

  return (

   

         
          <form encType="multipart/form-data">
      <div className="mb-3">
<label for="exampleFormControlInput1" className="form-label">Title</label>
<input type="title"  name="title" className="form-control" id="exampleFormControlInput1" placeholder="title"  value={inputs.title || ""}  onChange={handleChange}/>
</div>
<div className="mb-3">
<label for="formFile" className="form-label"> Image  </label>
<input className="form-control" name="image" type="file" id="formFile" ref={ref}  onChange={handleFileChange}/>
</div>
<div className="mb-3">
<label for="exampleFormControlTextarea1" className="form-label"> Description </label>
<textarea className="form-control" name="description" id="exampleFormControlTextarea1" rows="3"  value={inputs.description || ""}  onChange={handleChange}></textarea>
</div>
<p> <button onClick={submitHandler} style={{backgroundColor:'#0095f4',color:'white'}}>Create </button></p>
  </form>
         
          
        
  )
}

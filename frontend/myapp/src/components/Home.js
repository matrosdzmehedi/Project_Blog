import React ,{ useState, useEffect }  from 'react'
import axios from 'axios'
import Navbar from './Navbar';
import {formatDistanceToNow} from 'date-fns'
import Createpost from './Createpost';
import AuthContext from '../store/auth-context'


export default function Home(props) {
  
  const [cantnamevariable, setCantnamevariable] = useState([]);
  const [check,setCheck] = useState(0);

  useEffect(() =>{
    
    axios.get(`http://localhost:8000/api/public/posts/`)
    .then(res => {
        setCantnamevariable(res.data.results);  
    })
  },[check]);


  return (
    <AuthContext.Consumer>
    {(ctx)=>{
      return(
  <>
    <Navbar/>
    <div className = "container" >
      
      <div className='row'>
        <div className='col-md-8'>
          
{cantnamevariable.map(i => 
  <div className="card mb-3" style={{maxWidth: "100%"}}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={i.image} className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title"> <a   href={'/'+i.slug} style={{textDecoration: 'none'}} >{i.title}</a></h5>
        <p className="card-text">{i.description}</p>
        <p className="card-text"><small className="text-muted">{formatDistanceToNow(new Date(i.date))} ago</small></p>
      </div>
    </div>
  </div>
</div>
  
   )}
          
        </div>
        <div className='col-md-4' >
          {ctx.isLoggedIn ? (<Createpost check={check} setCheck={setCheck}/>):(<h4>You need to logged in to create a new post</h4>)} 
          </div>
      </div>
    </div></>
    )
  }}

</AuthContext.Consumer>)
}

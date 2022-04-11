import React , { useEffect ,useState }from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import Vote from './Vote';


export default function Detailspost(props) {
    const [data,setData] = useState([]);
    const { slug } = useParams();
        useEffect(() =>{
            axios.get(`http://localhost:8000/api/public/post-details/${slug}/`)
            .then(res => {
                setData(res.data);
            })
        },[]);
    
  return (
    <div>
        <Navbar/>
        <div className="container">
            <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
            <div key={data.title}>  <h2 >   {data.title} <span style={{fontSize:10}}> --{data.author}</span> </h2> 
            
       
            <img style={{height:'80%',width:'90%',paddingLeft:'7%'}} src={data.image} alt="nai"/>
          <article style={{textAlign:'justify',marginTop:'25px'}}>{data.description}</article>
       </div>
       <Vote slug={data.slug}/>
       <Comment slug={data.slug}></Comment>
            </div>
            <div className="col-1"></div>
            
            </div>
            </div>
    </div>
  )
}

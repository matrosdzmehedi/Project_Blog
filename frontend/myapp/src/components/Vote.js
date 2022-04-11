import React ,{useState,useEffect}from 'react'
import axiosInstance from '../axiosInstance';
import { useParams } from 'react-router-dom';
import  axios  from 'axios';
import AuthContext from '../store/auth-context';


export default function Vote() {
    const slug =  useParams();
    const [likecount,setLikecount] = useState(0);
    const [dislikecount,setDislikecount] = useState(0);
    let get_slug = slug.slug;
    const [val,setVal] = useState(0);

    useEffect(() =>{
            axios.get(`http://localhost:8000/api/public/likes-count/${get_slug}/`)
            .then(res => { 
                setLikecount(res.data[0].count_liked);
                setDislikecount(res.data[0].count_unliked);
            })
            .catch(err => { })
    },[val])

    const like =()=>{
        axiosInstance.post('http://localhost:8000/api/auth/new-like/',{
            ...slug,
            liked: true
        })
        .then(res => {
            setVal(val+1);
            console.log(res.data);
        })
    }

    const unlike =()=>{
        axiosInstance.post('http://localhost:8000/api/auth/new-like/',{
            ...slug,
            liked: false
        })
        .then(res => {
            setVal(val+1);
            console.log(res.data);
        })
    }

  return (
    <AuthContext.Consumer >
        {(ctx)=>{
            
            return (
             (<div style={{paddingTop:'20px'}}>

            {ctx.isLoggedIn ? (<button  onClick={like} style={{marginRight: '10px'}}> &#128077;</button>   ):(<button style={{marginRight: '10px'}}> &#128077;</button>   )}
            {ctx.isLoggedIn ? (<button  onClick={unlike} >&#128078;</button>):(<button >&#128078;</button>)}
            <span> like {likecount},  dislike {dislikecount} , total {likecount+dislikecount}</span>
         </div>))
            
        }}

    
    </AuthContext.Consumer>
  )
}

import React from 'react'
import AuthContext from '../store/auth-context'

export default function Navbar(props) {

  const logoutHandler =()=>{
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('isLogIn');

  }

  return (
    <AuthContext.Consumer >
      {(ctx)=>{
          return (<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{marginBottom:'10px'}}>
          <div className="container-fluid">
            <a className="navbar-brand" href="/">workspace</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav" >
                
               { ctx.isLoggedIn ? (<a onClick={logoutHandler} href='/login' className="nav-link btn-small" >logout</a>):(<a href="/login" className="nav-link" >login</a>)}  
              </div>
            </div>
          </div>
        </nav>)
      }}
    
</AuthContext.Consumer>
  )
}

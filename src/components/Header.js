import React, {Component} from 'react'
import {
    Redirect
} from 'react-router-dom'

class Header extends Component{
    constructor(props){
        super(props);

        this.state={
            logoutStatus:false
        }
    }

    logout(){
        fetch('/api/users/logout', {
            method: 'get',
            headers: {
              'Accept': 'application/json'
            }
          })
          .then(resp => resp.json())
          .then(auth=> { 
            
            localStorage.setItem("token",auth.token)
            
            this.setState({
                logoutStatus:true
            })
          })
          .catch((err)=>{
            console.log(JSON.stringify(err))
            alert("Failed to register, Please try again");
          })
    
    }

    componentWillReceiveProps(newProps){
        this.setState({
            loginStatus:newProps.loginStatus
        })
    }

    render(){
        var token=localStorage.getItem("token");
        console.log(token)

        if(this.state.logoutStatus){
            return(<Redirect to="/login"/>)
        }
        
        return(
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <a className="navbar-brand" href="/">Example</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                {
                            (token != 'null')?
                            (
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={this.logout.bind(this)}>Logout</a>
                                    </li>
                                </ul>
                            )
                            :
                            (
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/register">Register</a>
                                    </li>
                                </ul>
                            )
                        }
                </div>
            </nav>
        )
    }
}

export default Header;

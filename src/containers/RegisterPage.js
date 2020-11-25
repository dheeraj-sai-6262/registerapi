import React, {Component} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Register from '../components/Register'
class RegisterPage extends Component{
   constructor(){
       super();
        this.state={
           loginStatus:false
       }
        this.onRegistrationComplete=this.onRegistrationComplete.bind(this)
   }
    onRegistrationComplete(status){
       this.setState({
           loginStatus:status
       })
   }
    render(){
       return(
           <div>
             
               <Header loginStatus={this.state.loginStatus}/>
               <Register onRegistrationComplete={this.onRegistrationComplete}/>
               <Footer/>
           </div>
       )
    }
}

export default RegisterPage;

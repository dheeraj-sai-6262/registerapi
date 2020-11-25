import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        email: '',
        password: '',
        // RememberMe:false
      },
      touched: {
        email: false,
        password: false
      },
      loginCompleted: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(e) {

    //e - form
    //target - field
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const targetName = target.name;
    console.log(targetName + " " + value)

    const user = Object.assign({}, this.state.user);
    user[targetName] = value;

    this.setState({
      user
    })
  }
  onBlur(e) {
    let touched = Object.assign({}, this.state.touched);
    touched[e.target.name] = true;
    this.setState({
      touched
    })
  }
  validate() {
    const errors = {};
    const { user } = this.state;

    if (!user.email) {
      errors.email = 'Email is required';
    }



    if (!user.password) {
      errors.password = 'Password is required';
    }

    // if (!RememberMe) {
    //     errors.RememberMe = 'You must agree to terms';
    // }

    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  }

  onSubmit(e) {
    e.preventDefault();

    var formBody = [];


    for (var property in this.state.user) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(this.state.user[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    console.log(formBody)
    //API Call

    fetch('/api/users/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
      .then(resp => resp.json())
      .then(user => {
        console.log(JSON.stringify(user))
        alert("Your login successfully completed.")

        localStorage.setItem("token", user.token)

        // this.props.onLoginComplete(true)

        this.setState({
          user: {
            email: '',
            password: '',
            // RememberMe:false
          },
          touched: {
            email: false,
            password: false
          },
          loginCompleted: true
        })
      })
      .catch((err) => {
        console.log(JSON.stringify(err))
        // this.props.onLoginComplete(false)
        alert("Failed to login, Please try again");
      })

  }
  render() {
    if (this.state.loginCompleted) {
      return (
        <Redirect to="/" />
      )
    }
    else {
      const { user, touched } = this.state;
      const { errors, isValid } = this.validate();
      return (

        <div className="container text-center my-5">
          <h3 className="mr-5 display-4 orange">logIn </h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group col-4 mx-auto mt-5">
              <input name="email"
                type="email" value={this.state.user.email} onChange={this.onChange} onBlur={this.onBlur} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group col-4 mx-auto">
              <input name="password"
                type="password" value={this.state.user.password} onChange={this.onChange} onBlur={this.onBlur} className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <p>New User?
                    <a href="/register">Click here to Register...!</a>
          </p>
        </div>
      )
    }
  }
}


export default Login;
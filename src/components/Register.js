import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Register extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                fullName: '',
                phone: '',
                email: '',
                password: '',
                agreeToTerms: false
            },
            touched: {
                fullName: false,
                phone: false,
                email: false,
                password: false
            },
            registrationCompleted: false
        }

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
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

        if (!user.fullName) {
            errors.fullName = 'Name is required';
        }

        if (!user.phone) {
            errors.phone = 'Phone is required';
        }

        if (!user.password) {
            errors.password = 'Password is required';
        }

        if (!user.agreeToTerms) {
            errors.agreeToTerms = 'You must agree to terms';
        }

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

        fetch('/api/users/register', {
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
                alert("Thank you, You have registered successfully. We will email you confirmation shortly.")
                localStorage.setItem("token", user.token)
                this.props.onRegistrationComplete(true)
                this.setState({
                    user: {
                        fullName: '',
                        phone: '',
                        email: '',
                        password: '',
                        agreeToTerms: false
                    },
                    touched: {
                        fullName: false,
                        phone: false,
                        email: false,
                        password: false
                    },
                    registrationCompleted: true
                })
            })
            .catch((err) => {
                console.log(JSON.stringify(err))
                alert("Failed to register, Please try again");
                this.props.onRegistrationComplete(false)
            })

    }

    render() {


        if (this.state.registrationCompleted) {
            return (
                <div>
                    <h3>Thank you, You're successfully registered</h3>
                    <Link to="/home">Go to Home</Link>
                </div>
            )
        }
        else {
            const { user, touched } = this.state;
            const { errors, isValid } = this.validate();

            return (
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <img className="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal section-title">Register</h1>
                    <label htmlFor="inputName" className="sr-only">Full Name</label>
                    <div>
                        <input name="fullName" type="text" value={this.state.user.name} onChange={this.onChange} onBlur={this.onBlur} className="form-control" placeholder="Full Name" />
                        {touched.fullName && !!errors.fullName && <span>{errors.fullName}</span>}
                    </div>
                    <label htmlFor="inputPhone" className="sr-only">Full Name</label>
                    <div className="mt-3">
                        <input name="phone" value={this.state.user.phone} onChange={this.onChange} onBlur={this.onBlur} type="text" id="inputPhone" className="form-control" placeholder="Phone Number" />
                        {touched.phone && !!errors.phone && <span>{errors.phone}</span>}
                    </div>
                    <label htmlFor="inputEmail" className="sr-only">Email</label>
                    <div className="mt-3">
                        <input name="email" value={this.state.user.email} onChange={this.onChange} onBlur={this.onBlur} type="text" id="inputEmail" className="form-control" placeholder="Email address" />
                        {touched.email && !!errors.email && <span>{errors.email}</span>}
                    </div>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <div className="mt-3">
                        <input name="password" value={this.state.user.password} onChange={this.onChange} onBlur={this.onBlur} type="password" id="inputPassword" className="form-control" placeholder="Password" />
                        {touched.password && !!errors.password && <span>{errors.password}</span>}
                    </div>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" checked={this.state.user.agreeToTerms} onChange={this.onChange} name="agreeToTerms" /> I agree to terms and conditions
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="Submit" disabled={!isValid}>Register</button>
                </form>
            )
        }
    }
}

export default Register;
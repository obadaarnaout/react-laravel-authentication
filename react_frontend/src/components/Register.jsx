import React, { Component } from 'react'
import {
    Router,
    Switch,
    Route,
    Link,
    Routes ,
    BrowserRouter,
    NavLink,
    Navigate 
  } from "react-router-dom";
  import axios from 'axios';
export default class Register extends Component {
  state = {
    error: '',
    success: '',
    redirect: false
  }

  RegisterUser = (e) => {
    e.preventDefault();
    let self = this;
    axios.post('/register',{
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      password_confirmation: e.target.password_confirmation.value
    })
    .then(function (response) {
      localStorage.setItem("token", response.data.token);

      let success_error = <div className='alert alert-success'>{response.data.message}</div>;
      self.setState({error: '',
                      success: success_error,
                      redirect: true});
      self.props.setUser(response.data.user);
      self.props.setLoggedIn(true);
    })
    .catch(function (error) {
      let alert_error = <div className='alert alert-danger'>{error.response.data.message}</div>;
      self.setState({error: alert_error,
                      success: ''});
    });
  }

  render() {
    if (localStorage.getItem('token') !== null) {
      return (<Navigate to={'/profile'}/>)
    }
    if (this.state.redirect) {
      return (<Navigate to="/profile" />)
    }
    return (
      <div class="container">
        <br></br>
        {this.state.error}
        {this.state.success}
        <form onSubmit={this.RegisterUser}>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter your name" name='name' required></input>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' required></input>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name='password' required></input>
            </div>
            <div class="form-group">
                <label for="password_confirmation">Password Confirmation</label>
                <input type="password" class="form-control" id="password_confirmation" placeholder="Password Confirmation" name='password_confirmation' required></input>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    )
  }
}

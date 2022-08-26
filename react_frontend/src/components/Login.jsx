import React, { Component } from 'react'
import {
    Router,
    Switch,
    Route,
    Link,
    Routes ,
    BrowserRouter,
    NavLink,
    Navigate ,
    Redirect
  } from "react-router-dom";
  import axios from 'axios';

export default class Login extends Component {
    state = {
      error: '',
      success: '',
      redirect: false
    }

    LoginFormSubmit = (e) => {
        e.preventDefault();
        let self = this;
        axios.post('/login',{
          email: e.target.email.value,
          password: e.target.password.value
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
        <form onSubmit={this.LoginFormSubmit}>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" placeholder="Enter email" name='email' required></input>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" placeholder="Password" name='password' required></input>
            </div>
            <div class="form-group">
                <Link to="/forget">Forget Password</Link>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    )
  }
}

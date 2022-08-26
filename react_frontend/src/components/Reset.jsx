import React, { Component, useState } from 'react'
import {
    Router,
    Switch,
    Route,
    Link,
    Routes ,
    BrowserRouter,
    NavLink,
    Navigate, 
    useLocation,
    useParams,
    Redirect
  } from "react-router-dom";
  import axios from 'axios';

export default function Reset(props) {
    if (localStorage.getItem('token') !== null) {
        return (<Navigate to={'/profile'}/>)
    }
    const {id} = useParams();
    const [resetState,SetResetState] = useState(
                                            {
                                                error: '',
                                                success: '',
                                                redirect: false
                                            }
                                        );

    const ResetFormSubmit = (e) => {
          e.preventDefault();
          axios.post('/reset_password',{
            email: e.target.email.value,
            token: e.target.token.value,
            password: e.target.password.value,
            password_confirmation: e.target.password_confirmation.value
          })
          .then(function (response) {
  
            let success_error = <div className='alert alert-success'>{response.data.message}</div>;
            SetResetState({error: '',
                           success: success_error,
                           redirect: true});
          })
          .catch(function (error) {
            let alert_error = <div className='alert alert-danger'>{error.response.data.message}</div>;
            SetResetState({error: alert_error,
                           success: ''});
          });
    }

    if (resetState.redirect) {
        return (<Navigate to="/login" />)
    }
    return (
        <div class="container">
            <br></br>
            {resetState.error}
            {resetState.success}
            <form onSubmit={ResetFormSubmit}>
                <div class="form-group">
                    <label>Email address</label>
                    <input type="email" class="form-control" placeholder="Enter email" name='email' required></input>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" placeholder="Password" name='password' required></input>
                </div>
                <div class="form-group">
                    <label for="password_confirmation">Password Confirmation</label>
                    <input type="password" class="form-control" id="password_confirmation" placeholder="Password Confirmation" name='password_confirmation' required></input>
                </div>
                <input type="hidden" name='token' value={id}></input>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
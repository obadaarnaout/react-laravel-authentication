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

export default class Forget extends Component {
  state = {
    error: '',
    success: ''
  }

  ForgetFormSubmit = (e) => {
      e.preventDefault();
      let self = this;
      axios.post('/forget',{
        email: e.target.email.value,
      })
      .then(function (response) {

        let success = <div className='alert alert-success'>{response.data.message}</div>;
        self.setState({error: '',
                       success: success
                      });
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
    return (
      <div class="container">
        <br></br>
        {this.state.error}
        {this.state.success}
        <form onSubmit={this.ForgetFormSubmit}>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email'></input>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

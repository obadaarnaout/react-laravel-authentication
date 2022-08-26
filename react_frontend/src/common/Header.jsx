import React, { Component } from 'react'
import Nav from './Nav'
import {
    Router,
    Switch,
    Route,
    Link,
    Routes ,
    BrowserRouter,
    NavLink
  } from "react-router-dom";
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Profile from '../components/Profile';
import Forget from '../components/Forget';
import Reset from '../components/Reset';
import axios from 'axios';
  
export default class Header extends Component {
  state = {
    user: {},
    loggedIn: localStorage.getItem('token') !== null ? true : false
  };
  componentDidMount(){
    let self = this;
    axios.get('/get_user_data')
    .then(function (response) {
      self.setState({
        user: response.data
      });
    })
    .catch(function (error) {
    });
  }
  setUser = (user) => {
    this.setState({
      user: user
    });
  }
  setLoggedIn = (loggedIn) => {
    this.setState({
      loggedIn: loggedIn
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Nav user={this.state.user} setUser={this.setUser} loggedIn={this.state.loggedIn}  setLoggedIn={this.setLoggedIn}></Nav>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login setUser={this.setUser} setLoggedIn={this.setLoggedIn}/>}></Route>
            <Route path="/register" element={<Register setUser={this.setUser} setLoggedIn={this.setLoggedIn}/>}></Route>
            <Route path="/profile" element={<Profile user={this.state.user} />}></Route>
            <Route path="/forget" element={<Forget />}></Route>
            <Route path="/reset/:id" element={<Reset />}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

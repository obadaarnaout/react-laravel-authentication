import React, { Component } from 'react'
import {
  Router,
  Switch,
  Route,
  Link,
  Routes ,
  BrowserRouter,
  NavLink
} from "react-router-dom";

export class Nav extends Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.setLoggedIn(false);
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark  bg-dark">
          <a class="navbar-brand" href="/">Laravel React Auth</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
              </li>
              {(() => {
                if (this.props.loggedIn) {
              return(
                    <li class="nav-item">
                      <Link class="nav-link" to="/profile">Profile</Link>
                    </li>
                    )
                }
              })()}
            </ul>
            {(() => {
              if (!this.props.loggedIn) {
                return(
                  <span class="navbar-text">
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item active">
                        <Link class="nav-link" to="/login">Login</Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to="/register">Register</Link>
                      </li>
                    </ul>
                  </span>
                )
              }
              else{
                return(
                  <span class="navbar-text">
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item active">
                        <Link class="nav-link" to="/logout" onClick={this.logOut}>Logout</Link>
                      </li>
                    </ul>
                  </span>
                )
              }
            })()}
            
          </div>
        </nav>
        
      </div>
    )
  }
}

export default Nav

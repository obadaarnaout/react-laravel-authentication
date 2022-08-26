import React, { Component } from 'react'
import axios from 'axios';
import {
  Navigate
} from "react-router-dom";
export default class Profile extends Component {
  render() {
    if (!localStorage.getItem('token')) {
      return (<Navigate to={'/login'}/>)
    }

    return (
      <div>
        <h1>User: {this.props.user.name}</h1>
        <h1>Email: {this.props.user.email}</h1>
        
      </div>
    )
  }
}

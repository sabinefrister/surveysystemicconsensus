import React, { Component } from 'react';
import { getAllUsers, createUser } from './apiCall'
 
class ShowDataFromServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      users: [],
      numberOfUsers: 0
    };
    this.createUser = this.createUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  createUser = (e) => {
    createUser(this.state.user)
    .then(response => {
      console.log(response);
      this.setState({numberOfUsers: this.state.numberOfUsers + 1})
    });
  }

  getAllUsers = () => {
    getAllUsers()
    .then(users => {
      console.log("get all users")
      console.log(users)
      this.setState({users: users, numberOfUsers: users.length})
    });
  }

  render() {
    let users = getAllUsers()
    console.log(users)
    return (
      <React.Fragment>
        Hallo
      </React.Fragment>
    )
  }
};

export default ShowDataFromServer;
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

  createUser(data) {
    createUser(data)
    .then(response => {
      console.log(response);
    });
  }

  getAllUsers() {
    getAllUsers()
    .then(users => {
      this.setState({users: users, numberOfUsers: users.length})
    });
  }

  componentDidMount(){
    let users = this.getAllUsers()
    this.createUser({name: "bari", age: 32})
  }

  render() {
    return (
      <React.Fragment>
        Hallo
      </React.Fragment>
    )
  }
};

export default ShowDataFromServer;
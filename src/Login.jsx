import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = async (evt) => {
    evt.preventDefault();

    let data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    let response = await fetch('/login', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    let responseBody = await response.text();

    let body = JSON.parse(responseBody);

    if (!body.success) {
      swal('Oops...', 'incorrect username or password!', 'error');

      return;
    }
    this.props.dispatch({
      type: 'LOGIN_SUCCESS',
      username: this.state.username,
    });
  };
  render = () => {
    return (
      <div className="container">
        <form id="signup" onSubmit={this.handleSubmit}>
          <div className="sep" />
          <div className="inputs">
            <input
              type="text"
              placeholder="Username"
              autoFocus
              onChange={this.handleUsernameChange}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </div>
          <input type="submit" className="myButton" value="Login " />
        </form>
      </div>
    );
  };
}

let Login = connect()(UnconnectedLogin);
export default Login;

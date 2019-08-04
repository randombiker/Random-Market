import React, { Component } from 'react';
import { connect } from 'react-redux';

class Signup extends Component {
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
    const response = await fetch('/signup', {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
    });
    const body = await response.json();
    if (!body.success) return alert(body.message);
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
          <input type="submit" className="myButton" value="Signup" />
        </form>
      </div>
    );
  };
}

export default connect()(Signup);

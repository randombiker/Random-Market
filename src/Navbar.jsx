import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Search from './Search.jsx';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const { setLogout } = props;
  return (
    <div>
      <AppBar className="nav" position="static">
        <Toolbar>
          <Link to="/">
            <img
              src="/images/mylogo.png"
              width="90px"
              height="70px"
              onClick="goBack"
            />
          </Link>

          <Typography variant="h6" color="inherit" noWrap>
            <div className="logosize">
              <img src="/images/textfx.png" />
            </div>
          </Typography>

          {props.login && (
            <>
              <div>
                <Search />
              </div>

              <div>
                <Link className="myButton" to="/newListing">
                  Sell
                </Link>
                <button className="myButton" onClick={setLogout}>
                  Logout
                </button>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

function handleLogout(dispatch) {
  fetch('/logout', { method: 'POST', credentials: 'same-origin' });
  dispatch({ type: 'LOGOUT' });
}

const mapStateToProps = (state) => ({
  login: state.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  setLogout: () => handleLogout(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

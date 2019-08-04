import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Search from './Search.jsx';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const { setLogout } = props;
  return (
    <div>
      <div className="coupon">Free shipping for orders over $1.000.000!</div>
      <AppBar className="nav" position="static">
        <Toolbar>
          <img src="/images/logos.png" width="100px" height="70px" />

          <Typography variant="h6" color="inherit" noWrap>
            <div className="logosize">
              <img src="/images/cooltext2.png" />
            </div>
          </Typography>

          {props.login && (
            <>
              <div>
                <Search />
              </div>

              <div>
                <Link className="myButton" to="/sell">
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

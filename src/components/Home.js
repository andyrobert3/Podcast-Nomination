import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions";
import { withStyles } from "@material-ui/styles";

import SearchBar from './Search';
import PodcastCard from './Card';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


// const styles = () => ({
//   root: {
//     padding: '2px 4px',
//     display: 'flex',
//     alignItems: 'center',
//     width: 500,
//     margin: 'auto',
    
//   },
//   input: {
//     flex: 1
//   },
//   iconButton: {
//     padding: 10,
//   }
// });

class Home extends Component {

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  };

  render() {
    const { classes, isLoggingOut, logoutError } = this.props;

    return (
      <div>
        <SearchBar onClick={this.handleLogout}></SearchBar>
        <PodcastCard></PodcastCard>
        <h1>This is your app's protected area.</h1>
        <p>Any routes here will also be protected</p>
        <button onClick={this.handleLogout}>Logout</button>
        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default (connect(mapStateToProps)(Home));
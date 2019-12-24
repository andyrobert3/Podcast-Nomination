import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';




class Home extends Component {
  useStyles = () => makeStyles(theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10,
    }
  }));

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  };

  render() {
    const { isLoggingOut, logoutError } = this.props;
    const classes = this.useStyles();

    return (
      <div>
        <Paper component="form" className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <MenuIcon>

            </MenuIcon>

          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Search podcasts"
            inputProps={{ 'aria-label': 'search podcasts' }}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon/>
          </IconButton>      
        </Paper>
     
      
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
export default connect(mapStateToProps)(Home);
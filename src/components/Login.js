import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../actions";
import { withStyles } from "@material-ui/styles";

import Avatar from "@material-ui/core/Avatar";
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

const styles = () => ({
    "@global": {
      body: {
        backgroundColor: "#fff"
      }
    },
    paper: {
      marginTop: 100,
      display: "flex",
      padding: 20,
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "#f50057"
    },
    form: {
      marginTop: 1
    },
    errorText: {
      color: "#f50057",
      marginBottom: 5,
      textAlign: "center"
    }
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    handleEmailChange = ({
        target
    }) => {
        this.setState({
            email: target.value
        });
    };

    handlePasswordChange = ({
        target
    }) => {
        this.setState({
            password: target.value
        });
    };

    handleSubmit = () => {
        const { dispatch } = this.props;
        const { email, password } = this.state;

        dispatch(login(email, password));
    };

    render() {
        const { classes, loginError, isAuthenticated } = this.props;
        
        if (isAuthenticated) {
          return <Redirect to="/" />;

        } else {

          return (
            <Container component="main" maxWidth="xs">
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={this.handleEmailChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={this.handlePasswordChange}
                />
                {loginError && (
                  <Typography component="p" className={classes.errorText}>
                    Incorrect email or password.
                  </Typography>
                )}
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSubmit}
                >
                  Sign In
                </Button>
              </Paper>
              <Grid container justify="flex-end">
                <Grid item >
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={8}>
                <Copyright/>
              </Box>

            </Container>
          );
        }
      }

}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default withStyles(styles)(connect(mapStateToProps)(Login));
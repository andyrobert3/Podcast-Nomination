import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions";
import { withStyles } from "@material-ui/styles";

import SearchBar from './Search';
import PodcastList from './PodcastList';
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
  constructor(props) {
    super(props);

    this.state = {
      podcastCardList: []
    };


  };

  generateApiLink = (query, type = 'type') => {
    return `https://listen-api.listennotes.com/api/v2/search?q=${query}&sort_by_date=0&type=${type}&len_min=0&published_before=1390190241000&published_after=0&language=English&safe_mode=1`
  }

  fetchPodcastDetails = async event => {
    event.preventDefault();
    console.log(event.target.search.value);

    let apiLink = this.generateApiLink(event.target.search.value, null);

    let response = await fetch(apiLink, {
      headers: {
        'X-ListenAPI-Key': 'd1fed3045bba47f39ef7b306465dfa15'
      },
      method: 'GET'
    });

    if (response.ok) {
      let data = await response.json();

      this.setState({
        podcastCardList: data.results
      });
    } else {
      alert("HTTP-Error: " + response.status); 
    }
  };
 

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  };

  render() {
    const { classes, isLoggingOut, logoutError } = this.props;

    return (
      <div>
        <SearchBar logout={this.handleLogout} onClick={this.fetchPodcastDetails}/>
        <PodcastList podcastCardList={this.state.podcastCardList}></PodcastList>
        
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
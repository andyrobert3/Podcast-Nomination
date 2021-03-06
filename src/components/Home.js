import React, { Component } from "react";
import { connect } from "react-redux";
import { logout, getVotes, getUserLoginDetails, registerVote, checkVote, unregisterVote } from "../actions";

import './styles/podcastList.css';

import SearchBar from './Search';
import PodcastList from './PodcastList';

import { CircularProgress } from "@material-ui/core";

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
      podcastCardList: [],
      loading: false
    };


  };

  generateApiLink = (query, type = 'type') => {
    return `https://listen-api.listennotes.com/api/v2/search?q=${query}&sort_by_date=0&type=${type}&len_min=0&published_before=1390190241000&published_after=0&language=English&safe_mode=1`
  };

 
  hasVoted = (podcastId) => {
    const userDetails = getUserLoginDetails();
    if (userDetails === null) {

    } else {
      return checkVote(userDetails.uid, podcastId);
    }
  }

  vote = (podcastId) => {
    const userDetails = getUserLoginDetails();
    if (userDetails === null) {

    } else {
      return registerVote(userDetails.uid, podcastId);
    }
  }

  unVote = async (podcastId) => {
    const userDetails = await getUserLoginDetails();
    if (userDetails === null) {

    } else {
      return unregisterVote(userDetails.uid, podcastId);
    }
  }

  fetchPodcastDetails = async event => {
    event.preventDefault();

    let apiLink = this.generateApiLink(event.target.search.value, null);

    let response = await fetch(apiLink, {
      headers: {
        'X-ListenAPI-Key': 'd1fed3045bba47f39ef7b306465dfa15'
      },
      method: 'GET'
    });

    this.setState({
      loading: true
    })

    if (response.ok) {
      let data = await response.json();

      // check likes in database
      // add likes to data.results for each
      let podcastCardList = [];

      await Promise.all(
        data.results.map(async (val, idx) => {
          val.likes = await getVotes(val.id);
          val.voted = await this.hasVoted(val.id);

          podcastCardList.push(val);
        })
      );

      this.setState({
        podcastCardList: podcastCardList,
        loading: false
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
    return (
      <div style={{border: "thin solid blue"}}>
        <SearchBar logout={this.handleLogout} onClick={this.fetchPodcastDetails}/>
        {this.state.loading ? <CircularProgress className='LoadingScreen'/> : <PodcastList podcastCardList={this.state.podcastCardList} 
            onVote={this.vote} unVote={this.unVote}></PodcastList>}
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
import React, { Component } from 'react';
import PodcastCard from './Card';

import './styles/podcastList.css';

export default class PodcastList extends Component {
    render() {
        return (
            <div className='PodcastList'>
                {this.props.podcastCardList.map(podcast => <PodcastCard key={podcast.id}{...podcast} onVote={this.props.onVote}/>)}
            </div>
        )
    }
}
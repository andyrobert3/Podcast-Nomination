import React, { Component } from 'react';
import PodcastCard from './Card';

import './styles/podcastList.css';

const useStyles = () => ({
    companylist: {
        border: 'thin solid blue',
        margin: '2rem',
        display: 'flex',
        flexdirection: 'column'
    }
});

export default class PodcastList extends Component {
    render() {
        // const styles = useStyles();

        return (
            <div className='PodcastList'>
                {this.props.podcastCardList.map(podcast => <PodcastCard key={podcast.rss}{...podcast}/>)}
            </div>
        )
    }
}
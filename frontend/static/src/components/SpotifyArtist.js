import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SpotifyArtist extends Component {
    static propTypes = {
    artist: PropTypes.object,
    };

    render() {
    let dummyArtist = { name: '', followers: { total: ''}, images: [{url: ''}], genres: [], id: '',};
    let artist = this.props.artist ? this.props.artist : dummyArtist;
    let genres = artist.genres;
    return (
        <div className="profile-wrapper">
        { artist !== dummyArtist &&
        <div className="profile">
            <img 
            src={artist.images[0].url} 
            alt="{artist.name} Profile" 
            id="profile-img"/>
            <div>
            <div id="artist-name">{artist.name}</div>
            <div id="artist-follower-count">{artist.followers.total} followers</div>
            <div id="artist-genres">
                { genres.length > 0 &&
                genres.map((genre, k) => <span>{genre}</span>)
                    .reduce((prev,curr) => [prev, ', ', curr])
                }
            </div>
            </div>
        </div>
        }
        </div>
    );
    }
}

export default SpotifyArtist;
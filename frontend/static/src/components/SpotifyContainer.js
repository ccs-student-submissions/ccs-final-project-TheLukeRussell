import React, { Component } from 'react';
import SpotifyArtist from './SpotifyArtist';
import Spotify from './Spotify';

class App extends Component {
    state = {
        query: '',
        artist: null,
        errorMessage: '',
        tracks: undefined
    }

    search() {
    const result = Spotify.search(this.state.query)
        .then(json => this.handleSearch(json))
        .catch(e => {
        this.displayErrorMessage('Please enter an Aritst or Band name')
        });
    return result;
    }

    handleSearch(artistJSON) {
    const artist = artistJSON.artists.items[0];
    if(artist) {
        this.loadTracks(artist.id);
        return this.updateProfile(artistJSON)
    } else {
        this.displayErrorMessage('Artist or Band not found, please try again');
        return false;
    }
    }

    loadTracks(artistId) {
    Spotify.getTracks(artistId)
        .then((json) => {
        this.setState({
            tracks: json.tracks
        });
        });
    }

    updateProfile(artistJSON) {
    const artist = artistJSON.artists.items[0];
    this.setState({
        artist: artist, 
        errorMessage: ''
    });
    return artistJSON;
    }

    displayErrorMessage(message) {
    this.setState({
        errorMessage: message
    });
    }


    render() {
        console.log(this.state);
    return (
        <React.Fragment>
        <div className="search-container col-md-6">
        <div><img src="/static/public/Spotify_Logo_RGB_Green.png" alt="" id="spotify-image"/></div>
        <form onSubmit={ (e) => { e.preventDefault(); this.search(); } }>
            <input className="search-bar" type="text" placeholder="Search for an artist" value={this.state.query} onChange={event => {this.setState({query: event.target.value }) }} />
            <button className="btn btn--login">Submit</button>
        </form>
        <div>{this.state.errorMessage}</div>
        <div id="Profile"><SpotifyArtist artist={this.state.artist}/></div>
        </div>
        </React.Fragment>
    );
    }
}

export default App;
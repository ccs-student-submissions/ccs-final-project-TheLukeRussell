import React, { Component } from 'react';
import Spotify from './Spotify';


class App extends Component {
        state = {
        query: '',
        }


        render() {
        // console.log(this.state);
        return (
        <React.Fragment>
        <div className="search-container col-md-6">
        <div><img src="/static/public/Spotify_Logo_RGB_Green.png" alt="" id="spotify-image"/></div>
        <input className="search-bar" type="text" placeholder="Search for an artist" value={this.state.query} onChange={event => {this.setState({query: event.target.value }) }} />
        <Spotify selectFavArtist={this.props.selectFavArtist} query={this.state.query}/>
        </div>
        </React.Fragment>
        );
        }
}

export default App;
import React, { Component } from 'react';
import Spotify from './Spotify';


class App extends Component {
        state = {
        query: '',
        // errorMessage: '',
        }

//     search() {
//     const result = Spotify.search(this.state.query)
//         .then(json => this.handleSearch(json))
//         .catch(e => {
//         this.displayErrorMessage('Please enter an Aritst or Band name')
//         });
//     return result;
//     }

//     displayErrorMessage(message) {
//     this.setState({
//         errorMessage: message
//     });
//     }


        render() {
        console.log(this.state);
        return (
        <React.Fragment>
        <div className="search-container col-md-6">
        <div><img src="/static/public/Spotify_Logo_RGB_Green.png" alt="" id="spotify-image"/></div>
        <input className="search-bar" type="text" placeholder="Search for an artist" value={this.state.query} onChange={event => {this.setState({query: event.target.value }) }} />
        <div>{this.state.errorMessage}</div>
        <Spotify query={this.state.query}/>
        </div>
        </React.Fragment>
        );
        }
}

export default App;
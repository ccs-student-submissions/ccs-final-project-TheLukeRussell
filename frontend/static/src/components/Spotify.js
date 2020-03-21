import React, {Component} from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const spotifyApi = new SpotifyWebApi();

class Spotify extends Component{

  state = {
    token: '',
    artists: [],
    artist_search: []

  }
    componentDidMount() {
      // convert json to url params
    let params = new URLSearchParams({
      grant_type: 'client_credentials',
    }).toString();
    axios.post('https://accounts.spotify.com/api/token',
    params,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        'username': '35ae5945bd6e4eb7bf8e9515e0216d33',
        'password': '3df780e9823246909ae0fe56da3f1a6b',
      },
    })
    .then(res => {
      // console.log('token', res.data.access_token)
      this.setState({token: res.data.access_token})
    })
    .catch(err => console.log('error', err))
  }

  searchArtist = () => {
    spotifyApi.setAccessToken(this.state.token);
          // console.log(this.state.token);
            spotifyApi.searchArtists(this.props.query)
              .then(data => {
                console.log('Search Results', data.artists.items);
                this.setState({artist_search: data.artists.items})
              }, function(err) {
                console.error(err);
              });
  }

        render() {
          let artist_search = this.state.artist_search.map(artist => 
            <div key={artist.id}>
              <div>Artist Name: {artist.name}</div>
              <div>Artist ID: {artist.id}</div>
              <div>Artist Followers: {artist.followers.total}</div>
              <img src={artist.images[0].url} alt={`profile for ${artist.name}`}></img>
              <br/><br/><br/><br/>              
            </div>);

            return(
              <div className="spotify-test">
                <button onClick={() => this.searchArtist()} className='btn btn--login m-3'>Run</button>
                <h3 className='p-0 m-0'>{artist_search}</h3>
              </div>
            )
        }
    }
export default Spotify
import React, {Component} from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const spotifyApi = new SpotifyWebApi();

class Spotify extends Component{

  state = {
    token: null
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
  
        render() {
          // console.log(this.state);
            spotifyApi.setAccessToken(this.state.access_token);
            spotifyApi.getArtist('3XyvBNwsPBVhCXoYLNNQ84')
            .then(function(res) {
                // console.log('Artist information', res);
            }, function(err) {
                console.error(err);
            });
            return(
                    <h1>TEST PAGE</h1>
            )
        }
    }
export default Spotify
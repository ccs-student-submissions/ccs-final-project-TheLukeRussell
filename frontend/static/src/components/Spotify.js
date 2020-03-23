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
    artist_search: [],
    uri: '',
    // errorMessage: '',

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
            spotifyApi.searchArtists(this.props.query, {limit:15})
              .then(data => {
                console.log('Search Results', data.artists.items);
                this.setState({artist_search: data.artists.items})
              }, function(err) {
                // this.displayErrorMessage('Please enter an Aritst or Band name')
                console.error(err);
              });
  }
    // displayErrorMessage(message) {
    //   this.setState({
    //     errorMessage: message
    //   });
    //   }

    artistSelect(e) {
      console.log(e.target.getAttribute('value'))
        this.setState({uri: e.target.getAttribute('value')});
  }

        render() {
          let artist_search = this.state.artist_search.map(artist => 
            <div key={artist.id}>
              <div className="row no-gutters">
                <div className="col-xl-8">
                  <div className="row no-gutters">
                    <h2 className='col-md-12'><a href={artist.external_urls.spotify} target="_blank">{artist.name}</a></h2>
                    <h4 className='col-md-12'>{artist.followers.total.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} followers</h4>
                    </div>
                    {/* <div>{artist.id}</div> */}
                    <div className="row no-gutters">
                    <button value={artist.id} onClick={this.artistSelect} className='btn btn--login m-auto' type='button'>Select This Artist</button>
                  </div>
                </div>
                <div className="col-xl-4 mt-2">
                  <div className="row no-gutters">
                    <a href={artist.external_urls.spotify} target="_blank"><img className='col-md-12' src={ artist.images[0] ? artist.images[0].url : 'https://lh3.googleusercontent.com/proxy/ggw1FWSN-Va4aun69O0z7eDHcut-0mwx3M3HgaVTgpbtyJwEmRaiI6fh8x7LaRCuPCFrmDO_rCrFFTU6pf6AT6TE462AyU-tJEohIkdrJJYQqes9_KJmfizByAVdkZbqspdnh2YnPCSoAXULAw' } alt={`profile for ${artist.name}`}></img></a>
                  </div>
                </div>
              </div> 
              <br/><br/><br/><br/>            
            </div>);

            return(
              <div className="spotify-test">
                <button type='button' onClick={() => this.searchArtist()} className='btn btn--login m-3'>Run</button>
                {/* <div>{this.state.errorMessage}</div> */}
                <div className='p-0 m-0'>{artist_search}</div>
                </div>
            )
        }
    }
export default Spotify
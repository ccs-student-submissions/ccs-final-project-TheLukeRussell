import React, {Component} from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const client_id='35ae5945bd6e4eb7bf8e9515e0216d33'
const client_secret='3df780e9823246909ae0fe56da3f1a6b'

const spotifyApi = new SpotifyWebApi({
    clientId : '35ae5945bd6e4eb7bf8e9515e0216d33',
    clientSecret : '3df780e9823246909ae0fe56da3f1a6b'
    });

class Spotify extends Component{

    componentDidMount() {

        // 415 server error
        // axios.post('https://accounts.spotify.com/api/token', {
        //     params: {
        //         grant_type: 'client_credentials'
        //     }, 
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        //     }
        //     })
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })

        axios({
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
            params: {
            grant_type: 'client_credentials'
            },
            headers: {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
            username: client_id,
            password: client_secret
            }
        }).then(function(response) {
            console.log(response);
        }).catch(function(error) {
        });
    }

        render() {
            spotifyApi.setAccessToken('BQDqZcC1h7XRP-lKrdy1u-_vwgrOX22KQTh2_u2LFUj0sxQ0mL64vdjTMKlV1KSJkaCNVa7uav2NK4KeoDakPAeSn_f2xUWjrgrcjCpqoI9Tij7Ecy-3-sbrpWQxR3qffu9tqglKHh6tkT21M0TahMCds1N2mouHPIQDC2c5SND19hVOHvU9bSPhhVaFyvW6oyYX0BTan97LA3UejSRHeDcFsQQ9Dv8rev3lB2xTJ92M4rGqbMj85eQMSkhwETrxxzlHwRi4Pzu0GktzMIg');
            spotifyApi.getArtist('3XyvBNwsPBVhCXoYLNNQ84')
            .then(function(res) {
                console.log('Artist information', res);
            }, function(err) {
                console.error(err);
            });
            return(
                    <h1>TEST PAGE</h1>
            )
        }
    }
export default Spotify
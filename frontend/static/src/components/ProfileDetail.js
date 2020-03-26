import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'
import {motion} from "framer-motion"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;

class ProfileDetail extends Component {


    state = {
        followers: [],
        following: [],
    }

    componentDidMount() {
        // console.log(JSON.parse(localStorage.getItem('my-app-user')).key)
        axios.get(`/api/v1/users/${this.props.match.params.id}/`, )
            .then(res => {
            // console.log('res', res.data);
            this.setState(res.data);
            })
            .catch(error => {
            console.log(error);
        });
}
    handleFollow = (e) => {
        e.preventDefault();
        
        let data = {following: this.props.match.params.id}

        axios.post(`/api/v1/connections/`, data,)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error);
        })
        window.location.reload()
    }

render() {
    let artistPlay;
    let artistFollow;

    if(this.state.profile) {
        artistPlay = `https://open.spotify.com/embed/artist/${this.state.profile.uri}`
        artistFollow = `https://open.spotify.com/follow/1/?uri=spotify:artist:${this.state.profile.uri}&size=detail&theme=dark`
    }
    
    console.log(this.state)
    // console.log(artistPlay);
    let instruments;
    if (this.state.profile) {
        instruments = this.state.profile.instruments.map(instrument => <p>{instrument.text}</p>)
    }
    const followers = this.state.followers.map(follower => (
        <p>{follower.user.username}</p>
    ))
    const followings = this.state.following.map(following => (
        <p>{following.following.username}</p>
    ))
    return(
        <React.Fragment>
        <Header />
        <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="app">
        <div className="profile-head">
            <h1>Profile</h1>
            {this.state.profile && <img src={this.state.profile.avatar} alt="profile"/>}
            {this.state.profile && <p className='mt-4'>{this.state.profile.name}</p>}
            {localStorage.getItem('my-app-user') ? (
            <form id='event-form' className='mt-5' onSubmit={this.handleFollow}>
                <button className='btn btn-primary'>Follow</button>
            </form>
            ) : (
            <div>hi</div>
            )}
        </div>
        <div className="row no-gutters profile-detail">
    <div className="col-md-10">
        <div className="row no-gutters">
            <div id='profile-box' className="col-md-5">
                <h2>Groups/Bands:</h2>
            </div>
            <div id='profile-box' className="col-md-5">
                <h2>About Me:</h2>
                {this.state.profile && <p>{this.state.profile.about}</p>}
            </div>
        </div>
        <div className="row no-gutters">
            <div id='profile-box' className="col-md-5">
                <h2>Instruments:</h2>
                <div>{instruments}</div>
            </div>
            <div id='profile-box' className="col-md-2">
                <h2>Followers:</h2>
                <div>{followers}</div>
            </div>
            <div id='profile-box' className="col-md-2">
                <h2>Following:</h2>
                <div>{followings}</div>
            </div>
        </div>
    </div>
    <div className="col-md-2">
    <iframe src={artistFollow} title='player' width="300" height="56" scrolling="no" frameBorder="0" allowtransparency="true"></iframe>
        <iframe src={artistPlay} title='follow' width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
</div>
        </motion.div>
        </React.Fragment>
    )
}

}

export default ProfileDetail
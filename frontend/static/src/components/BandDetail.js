import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'
import {motion} from "framer-motion"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;

class BandDetail extends Component {


    state = {
        user: '',
        band_following: [],
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
        axios.get(`/api/v1/rest-auth/user/`)
            .then (res => this.setState({user: res.data}))
            .catch(error => {
                console.log(error);
            });
        
}


render() {


    // const bands = this.state.bands.map(band =>(
    // <p>{band.user.username}</p>
    // ))

    const bandFollowing = this.state.band_following.map(band_following => (
        <a href={`/profile/detail/${band_following.band_member.id}`}>{band_following.band_member.username}</a>
    ))

    let artistPlay;
    let artistFollow;
    console.log(this.state);
    if(this.state.band) {
        artistPlay = `https://open.spotify.com/embed/artist/${this.state.band.uri}`
        artistFollow = `https://open.spotify.com/follow/1/?uri=spotify:artist:${this.state.band.uri}&size=detail&theme=dark`
    }
    return(
        <React.Fragment>
        <Header/>
        <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="app">
        <div className="profile-head">
            <h1>Band Profile</h1>
            {this.state.band && <img src={this.state.band.avatar} alt="profile"/>}
            {this.state.band && <p className='mt-4'>{this.state.band.name}</p>}
            
            
        </div>
        <div className="row profile-detail">
    <div className="col-xl-8">
        <div className="row no-gutters">
            <div id='profile-box' className="col-md-5">
                <h2>About Us</h2>
                {this.state.band && <p>{this.state.band.about}</p>}
            </div>
            <div id='profile-box' className="col-md-5">
                <h2>Members</h2>
                <div id='follow-me'>{bandFollowing}</div>
            </div>
        </div>
    </div>
    <div className="col-xl-4 profile-right">
        <h3 className='mb-0 p-0'>Check out our Top Tracks!</h3>
        <iframe src={artistFollow} title='player' width="300" height="56" scrolling="no" frameBorder="0" allowtransparency="true"></iframe>
        <iframe src={artistPlay} title='follow' width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
</div>
        </motion.div>
        </React.Fragment>
    )
}

}

export default BandDetail
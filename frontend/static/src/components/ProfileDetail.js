import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'
import {motion} from "framer-motion"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;

const pageVariants = {
    in: {
        opacity: 1,
        y: 0,
        scale: 1
    },
    out: {
        opacity: 0,
        y: "-100%",
        scale: .8
    }
}
const pageTransition = {
    type: "tween",
    // ease: "anticipate",
    duration: 1
}

class ProfileDetail extends Component {


    state = {
        followers: [],
        following: [],
        band_members: [],
        band_following: [],
        user: '',
    }

    componentDidMount() {
        // console.log(JSON.parse(localStorage.getItem('my-app-user')).key)
        axios.get(`/api/v1/users/${this.props.match.params.id}/`,)
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
            })
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

    handleAdd = (e) => {
        e.preventDefault();
        
        let data = {band_following: this.props.match.params.id}

        axios.post(`/api/v1/members/`, data,)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error);
        })
        window.location.reload()
    }

render() {
    console.log(this.state.id);
    let artistPlay;
    // let artistFollow;

    if(this.state.profile) {
        artistPlay = `https://open.spotify.com/embed/artist/${this.state.profile.uri}`
        // artistFollow = `https://open.spotify.com/follow/1/?uri=spotify:artist:${this.state.profile.uri}&size=detail&theme=dark`
    }

    let instruments;
    if (this.state.profile) {
        instruments = this.state.profile.instruments.map(instrument => <p key={instrument.text}>{instrument.text}</p>)
    }

    const bandMembers = this.state.band_members.map(band_member => (
        <motion.a whileHover={{scale: 1.1, color: '#C3073F'}} whileTap={{scale:1}} key={band_member.user.id} href={`/band/detail/${band_member.user.id}`}>{band_member.user.username}</motion.a>
    ))

    const bandMembersIds = this.state.band_members.map(band_member => (
        band_member.user.id
    ))

    const followers = this.state.followers.map(follower => (
        <motion.a whileHover={{scale: 1.1, color: '#C3073F'}} whileTap={{scale:1}} href={`/profile/detail/${follower.user.id}`}>{follower.user.username}</motion.a>
    ))

    const followings = this.state.following.map(following => (
        <motion.a whileHover={{scale: 1.1, color: '#C3073F'}} whileTap={{scale:1}} href={`/profile/detail/${following.following.id}`}>{following.following.username}</motion.a>
    ))
    
    const followerIds = this.state.followers.map(follower => (
        follower.user.id
    ))

    let alreadyFollows = false;
    if(followerIds.includes(this.state.user.pk)){
        alreadyFollows = true;
    }

    let alreadyMembers = false;
    if(bandMembersIds.includes(this.state.user.pk)){
        alreadyMembers = true;
    }
    return(
        <React.Fragment>
        <Header/>
        <motion.div exit="out" animate="in" initial="out" transition={pageTransition} variants={pageVariants} className="app">
        <div className="profile-head">
            <h1>Profile</h1>
            {this.state.profile && <img src={this.state.profile.avatar} alt="profile"/>}
            {this.state.profile && <p className='mt-4'>{this.state.profile.name}</p>}

            <div className="row no-gutters justify-content-center">
            {((this.state.id !== this.state.user.pk ) && (this.state.id !== undefined) && (alreadyFollows === false)) ? <form id='event-form' className='p-2' onSubmit={this.handleFollow}>
                <button className='btn btn-primary'>Follow</button>
            </form> : null}
            {((this.state.id !== this.state.user.pk ) && (this.state.id !== undefined) && (JSON.parse(localStorage.getItem('my-app-user')).user.profile === null) && (alreadyMembers === false)) ? <form id='event-form' className='p-2' onSubmit={this.handleAdd}>
                <button className='btn btn-primary'>Add Member</button>
            </form> : null}
            </div>
        </div>
        <div className="row no-gutters profile-detail">
    <div className="col-xl-8">
        <div className="row no-gutters">
            <div id='profile-box' className="col-md-5">
                <h2>Member of Bands/Artists</h2>
                <div id='follow-me'>{bandMembers}</div>
            </div>
            <div id='profile-box' className="col-md-5">
                <h2>About Me</h2>
                {this.state.profile && <p>{this.state.profile.about}</p>}
            </div>
        </div>
        <div className="row no-gutters">
            <div id='profile-box' className="col-md-5">
                <h2>Instruments</h2>
                <div>{instruments}</div>
            </div>
            <div id='profile-box' className="col-md-2">
                <h2>Followers</h2>
                <div id='follow-me'>{followers}</div>
            </div>
            <div id='profile-box' className="col-md-2">
                <h2>Following</h2>
                <div id='follow-me'>{followings}</div>
            </div>
        </div>
    </div>
    <div className="col-xl-4 profile-right">
        <h3 className='mb-0 p-0'>Check out my Favorite Artist's Top Tracks!</h3>
    {/* <iframe src={artistFollow} title='player' width="300" height="56" scrolling="no" frameBorder="0" allowtransparency="true"></iframe> */}
        <iframe title='play' src={artistPlay} width="300" height="400" frameBorder="0"></iframe>
    </div>
</div>
        </motion.div>
        </React.Fragment>
    )
}

}

export default ProfileDetail
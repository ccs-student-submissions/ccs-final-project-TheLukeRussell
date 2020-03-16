import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;

class ProfileDetail extends Component {


    state = {
        editingProfile: false,
        profileEditing: {},
        // profile: {}
    }

    componentDidMount() {
        // console.log(JSON.parse(localStorage.getItem('my-app-user')).key)
        axios.get(`/api/v1/users/${this.props.match.params.id}/`, )
            .then(res => {
            console.log('res', res.data);
            this.setState(res.data);
            })
            .catch(error => {
            console.log(error);
        });
}

render() {
    // const uri = this.state.uri
    // const artistPlay = `https://open.spotify.com/embed/artist/${uri}`
    // const artistFollow = `https://open.spotify.com/follow/1/?uri=spotify:artist:${uri}&size=detail&theme=dark`
    // console.log(this.state.profile.avatar)
    // console.log(artistPlay);
    // let someVarName;
    // if(this.state.users) {
    //     someVarName = this.state.users.map(user => <div>I am a user</div>)
    // }
    let instruments;
    if (this.state.profile) {
        instruments = this.state.profile.instruments.map(instrument => <p>{instrument.text}</p>)
    }
    // const followers = this.state.followers.map(follower => (
    //     <div>{followers.following}</div>
    // ))
    console.log(this.state.followers)
    console.log(this.state.following)
    return(
        <React.Fragment>
        <Header />
        <div className="profile-head">
            <h1>Your Profile</h1>
            {this.state.profile && <img src={this.state.profile.avatar} alt="profile"/>}
            {this.state.profile && <p className='mt-4'>{this.state.profile.name}</p>}
        </div>
        <div className="row no-gutters profile-detail">
    <div className="col-10">
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
            <div id='profile-box' className="col-md-5">
                <h2>Connections:</h2>
                {/* <div>{followers}</div> */}
            </div>
        </div>
    </div>
    <div className="col-2">
    {/* <iframe src={artistFollow} title='player' width="300" height="56" scrolling="no" frameBorder="0" allowtransparency="true"></iframe>
        <iframe src={artistPlay} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe> */}
    </div>
</div>
        </React.Fragment>
    )
}

}

export default ProfileDetail
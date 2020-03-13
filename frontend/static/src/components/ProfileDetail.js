import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;

class ProfileDetail extends Component {


    state = {
        // profile: [],
        // is_active: '',
        // preview: '',
        // avatar: '',
        // guitar: false,
        // drums: false,
        // piano: false,
    }

    componentDidMount() {
        // console.log(JSON.parse(localStorage.getItem('my-app-user')).key)
        axios.get(`/api/v1/profile/${this.props.match.params.id}/`, )
            .then(res => {
            console.log('res', res.data);
            this.setState(res.data);
            })
            .catch(error => {
            console.log(error);
        });
}
render() {
    const uri = this.state.uri
    const artistPlay = `https://open.spotify.com/embed/artist/${uri}`
    const artistFollow = `https://open.spotify.com/follow/1/?uri=spotify:artist:${uri}&size=detail&theme=dark`
    console.log(artistPlay);
    return(
        <React.Fragment>
        <Header />
        <div className="profile-head">
            <h1>Profile Page of {this.state.name}</h1>
            <img src={this.state.avatar} alt="profile"/>
            <div className="w-100"></div>
        </div>
        <div className="row no-gutters profile-detail">
    <div className="col-10">
        <div className="row no-gutters">
            <div id='profile-box' className="col-md-5">
                <h2>Groups/Bands:</h2>
            </div>
            <div id='profile-box' className="col-md-5">
                <h2>About Me:</h2>
                <p>{this.state.about}</p>
            </div>
        </div>
        <div className="row no-gutters">
            <div id='profile-box' className="col-md-5">
                <h2>Instruments:</h2>
                <p></p>
            </div>
            <div id='profile-box' className="col-md-5">
                <h2>Connections:</h2>
            </div>
        </div>
    </div>
    <div className="col-2">
    <iframe src={artistFollow} title='player' width="300" height="56" scrolling="no" frameBorder="0" allowtransparency="true"></iframe>
        <iframe src={artistPlay} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
</div>
        </React.Fragment>
    )
}

}

export default ProfileDetail
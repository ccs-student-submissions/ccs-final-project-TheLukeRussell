import React, {Component} from 'react';
import axios from 'axios';
import SpotifyContainer from './SpotifyContainer';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;

class ProfileCreate extends Component {


    state = {
        name: '',
        avatar: null,
        preview: '',
        profile: [],
        created_by: '',
        about: '',
        guitar: false,
        piano: false,
        drums: false,
    };

    handleCheckboxChange = (e) => {
    this.setState({[e.target.name]: e.target.checked});
        }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleAvatarChange = (e) => {
        let file = e.target.files[0];
        this.setState({avatar: file});

    let reader = new FileReader();
    reader.onloadend = () => {
        this.setState({preview: reader.result});
    };
    reader.readAsDataURL(file);
    }

    choiceForm = (key, instruments) => {
        for (let key in this.state.instruments) {
            if (key === true);
            console.log(this.state.instruments)
        } return instruments[key];
    }

    handleSubmit = (e) => {
    e.preventDefault();

    let obj = {
        guitar: 'Guitar',
        piano: 'Piano',
        drums: 'Drums',
    }

    let formData = new FormData();
    let data = this.state;
    let instruments = []

    for (let key in obj) {
        if (data[key] === true) {
            instruments.push(obj[key]);
        }
    }

    formData.append('name', this.state.name);
    formData.append('avatar', this.state.avatar);
    formData.append('about', this.state.about);
    formData.append('instruments', JSON.stringify(instruments));
    // console.log(instruments);
    axios.post(`/api/v1/create/`, formData, {
        headers : {
        'content-type': 'multipart/form-data',
        'Authorization': `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}`
        }
    })
    .then(res => {
        console.log(res);
        this.props.history.push('/events/');
    })
    .catch(error =>{
        console.log(error);
    });
    }

    componentDidMount() {
        axios.get('/api/v1/create/')
    .then(res => {
        // console.log(res);
        this.setState({profile: res.data});
    })
    .catch(error => {
        console.log(error);
    });
    }
    render(){
    return (
        <React.Fragment>
            <section>
            <form id='profile-create' onSubmit={this.handleSubmit}>
            <h1 className='mb-5'>Create Your Profile</h1>
            <h5>What's Your Name?</h5>
                <div className="form-group mb-5">
                    <input className='col-md-4 form-control mb-5' type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
                </div>
            <h5 className='mt-5'>About Me</h5>
                <div className="row no-gutters form-group mb-5">
                    <textarea className='col-md-4 form-control' type="text" name='about' value={this.state.about} onChange={this.handleChange} />
                </div>
            <h5 className='mt-5'>What Instruments Do You Play?</h5>
                <div className="row no-gutters form-check">
                    <input type="checkbox" checked={this.state.guitar} name='guitar' value={this.state.guitar} onChange={this.handleCheckboxChange} />
                    <label htmlFor="guitar" className='ml-1 mr-5'>Guitar</label>
                    <input type="checkbox" checked={this.state.piano} name='piano' value={this.state.piano} onChange={this.handleCheckboxChange} />
                    <label htmlFor="piano" className='ml-1 mr-5'>Piano</label>

                    <input type="checkbox" checked={this.state.drums} name='drums' value={this.state.drums} onChange={this.handleCheckboxChange} />
                    <label htmlFor="drums" className='ml-1 mr-5'>Drums</label>
                </div>
            <h5 className='mt-5'>Choose Your Profile Pic!</h5>
            {this.state.avatar ? (
            <img src={this.state.preview} alt='preview'/>
            ):(
            <input className='col-md-3 offset-1' type='file' name='avatar' onChange={this.handleAvatarChange}/>
            )}
            <h4 className='mt-5'>Search for your favorite artist!</h4>
            <SpotifyContainer />
            <button className='btn btn-primary mb-5'>Save Profile</button>
            </form>
        </section>
        </React.Fragment>
    )
    }
}

export default ProfileCreate;

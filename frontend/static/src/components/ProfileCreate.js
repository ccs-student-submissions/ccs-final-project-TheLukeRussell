import React, {Component} from 'react';
import axios from 'axios';
import SpotifyContainer from './SpotifyContainer';
import {motion} from "framer-motion"

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
        bass: false,
        vocals: false,
        horn: false,
        woodwind: false,
        strings: false,
        ukulele: false,

        uri: '',
    };

    selectFavArtist = (uri) => {
        console.log(uri)
        this.setState({uri})
    }

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
        bass: 'Bass Guitar',
        vocals: 'Vocals',
        horn: 'Horn',
        woodwind: 'Woodwind',
        strings: 'Strings',
        ukulele: 'Ukulele',
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
    formData.append('uri', this.state.uri);
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
        this.props.history.push('/list/');
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
        // console.log(this.state)
    return (
        <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="app">
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
                    <input type="checkbox" checked={this.state.bass} name='bass' value={this.state.bass} onChange={this.handleCheckboxChange} />
                    <label htmlFor="bass" className='ml-1 mr-5'>Bass</label>
                    <input type="checkbox" checked={this.state.vocals} name='vocals' value={this.state.vocals} onChange={this.handleCheckboxChange} />
                    <label htmlFor="vocals" className='ml-1 mr-5'>Vocals</label>
                    <input type="checkbox" checked={this.state.horn} name='horn' value={this.state.horn} onChange={this.handleCheckboxChange} />
                    <label htmlFor="horn" className='ml-1 mr-5'>Horn</label>
                    <input type="checkbox" checked={this.state.woodwind} name='woodwind' value={this.state.woodwind} onChange={this.handleCheckboxChange} />
                    <label htmlFor="woodwind" className='ml-1 mr-5'>Woodwind</label>
                    <input type="checkbox" checked={this.state.strings} name='strings' value={this.state.strings} onChange={this.handleCheckboxChange} />
                    <label htmlFor="strings" className='ml-1 mr-5'>Strings</label>
                    <input type="checkbox" checked={this.state.ukulele} name='ukulele' value={this.state.ukulele} onChange={this.handleCheckboxChange} />
                    <label htmlFor="ukulele" className='ml-1 mr-5'>Ukulele</label>
                </div>
            <h5 className='mt-5'>Choose Your Profile Pic!</h5>
            {this.state.avatar ? (
            <img src={this.state.preview} alt='preview'/>
            ):(
            <input className='col-md-3 offset-1' type='file' name='avatar' onChange={this.handleAvatarChange}/>
            )}
            <h4 className='mt-5'>Search for your favorite artist!</h4>
            <SpotifyContainer selectFavArtist={this.selectFavArtist}/>
            <button className='btn btn-primary mb-5'>Save Profile</button>
            </form>
        </section>
        </motion.div>
    )
    }
}

export default ProfileCreate;

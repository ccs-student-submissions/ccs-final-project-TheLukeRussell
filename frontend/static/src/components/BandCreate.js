import React, {Component} from 'react';
import axios from 'axios';
import SpotifyContainer from './SpotifyContainer';
import {motion} from "framer-motion"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;

const pageVariants = {
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    }
}
const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: .5
}

class BandCreate extends Component {


    state = {
        name: '',
        avatar: null,
        preview: '',
        band: [],
        created_by: '',
        about: '',
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
    axios.post(`/api/v1/band-create/`, formData, {
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
        this.setState({band: res.data});
    })
    .catch(error => {
        console.log(error);
    });
    }
    render(){
        console.log(this.state)
    return (
        <motion.div exit="out" animate="in" initial="out" transition={pageTransition} variants={pageVariants} className="app">
            <section>
            <form id='profile-create' onSubmit={this.handleSubmit}>
            <h1 className='mb-5'>Create Your Band Profile</h1>
            <h5>What's Your Band/Artist Name?</h5>
                <div className="form-group mb-5">
                    <input className='col-md-4 form-control mb-5' type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
                </div>
            <h5 className='mt-5'>About Us</h5>
                <div className="row no-gutters form-group mb-5">
                    <textarea className='col-md-4 form-control' type="text" name='about' value={this.state.about} onChange={this.handleChange} />
                </div>
            <h5 className='mt-5'>Choose Your Band Profile Pic!</h5>
            {this.state.avatar ? (
            <img src={this.state.preview} alt='preview'/>
            ):(
            <input className='col-md-3 offset-1' type='file' name='avatar' onChange={this.handleAvatarChange}/>
            )}
            <h4 className='mt-5'>Search for your artist page!</h4>
            <SpotifyContainer selectFavArtist={this.selectFavArtist}/>
            <button className='btn btn-primary mb-5'>Save Profile</button>
            </form>
        </section>
        </motion.div>
    )
    }
}

export default BandCreate;
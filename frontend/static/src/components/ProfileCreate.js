import React, {Component} from 'react';
import axios from 'axios';

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
    console.log(instruments);
    axios.post(`/api/v1/profile/create/`, formData, {
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
        axios.get('/api/v1/profile/create/')
    .then(res => {
        console.log(res);
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
            <form onSubmit={this.handleSubmit}>
            <h2>Create Your Profile</h2>
            <p>What's Your Name?</p>
                <div className="row no-gutters form-group mb-5">
                    <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
                </div>
            <p>About Me</p>
                <div className="row no-gutters form-group mb-5">
                    <textarea className='col-md-4 form-control' type="text" name='about' value={this.state.about} onChange={this.handleChange} />
                </div>
            <p>What Instruments Do You Play?</p>
            <span>Hold cmd and select your instrumets if you play multiple</span>
                <div class="row no-gutters form-check">
                    <input type="checkbox" checked={this.state.guitar} name='guitar' value={this.state.guitar} onChange={this.handleCheckboxChange} />
                    <label for="guitar">Guitar</label>

                    <input type="checkbox" checked={this.state.piano} name='piano' value={this.state.piano} onChange={this.handleCheckboxChange} />
                    <label for="piano">Piano</label>

                    <input type="checkbox" checked={this.state.drums} name='drums' value={this.state.drums} onChange={this.handleCheckboxChange} />
                    <label for="drums">Drums</label>
                </div>
            <p>Select an Image!</p>
            {this.state.avatar ? (
            <img src={this.state.preview} alt='preview'/>
            ):(
            <input type='file' name='avatar' onChange={this.handleAvatarChange}/>
            )}
            <button className='btn btn-primary mt-5'>Save Profile</button>
            </form>
        </section>
        </React.Fragment>
    )
    }
}

export default ProfileCreate;

import React, {Component} from 'react';
import Header from './Header'
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

// const pageVariants = {
//     in: {
//         opacity: 1,
//     },
//     out: {
//         opacity: 0,
//     }
// }
// const pageTransition = {
//     type: "tween",
//     ease: "anticipate",
//     duration: .5
// }

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const thumbnailVariants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { duration: 1.5, ...transition }
  }
};

class UpdateProfile extends Component{
    state = {
        name: '',
        about: '',
        guitar: false,
        piano: false,
        drums: false,
        profile: null,
    };

    componentDidMount() {
        if(this.props.editProfile){
            this.setState({
                name: this.props.profileEditing.name,
                about: this.props.profileEditing.about,
                guitar: this.props.profileEditing.guitar,
                piano: this.props.profileEditing.piano,
                drums: this.props.profileEditing.drums,
                profile: this.props.profileEditing.profile,
            })
        }


    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;


        this.setState({[name]: value});
        console.log({[name]: value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let updatedEvent = Object.assign({},this.state);
        updatedEvent.id = this.props.profileEditing.id
        this.props.updateEventSubmit(updatedEvent)

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
    }

    render(){
        return(
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
            <button onClick={() => this.editEvent(event)} className=' ml-2 btn btn-primary'>Edit</button>
            </form>
        </section>
        </React.Fragment>
        )
    }
}

export default UpdateProfile;
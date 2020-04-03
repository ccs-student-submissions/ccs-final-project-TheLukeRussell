import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'
import {motion} from "framer-motion"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSFRToken';

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

class EventForm extends Component {
    state = {
        title: '',
        image: null,
        location: '',
        description: '',
        category: '',
        preview: '',
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
    
        formData.append('title', this.state.title);
        formData.append('location', this.state.location);
        formData.append('description', this.state.description);
        formData.append('category', this.state.category);
        formData.append('image', this.state.image);


    
        axios.post('/api/v1/events/', formData, {
            headers: {
            'content-type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error);
        })
        window.location.reload()
    }

    handleImage = (e) => {
        // console.log(e.target.files);
        let file = e.target.files[0];
        this.setState({image: file});
        let reader = new FileReader()
        reader.onloadend = () => this.setState({preview: reader.result});
        reader.readAsDataURL(file);
    }

    onChange = e => {
        this.setState({
            category: this.props.category ? this.props.category + e.target.value : e.target.value})
        }

    render() {

        return(
            <React.Fragment>
                <Header />
            <motion.div exit="out" animate="in" initial="out" transition={pageTransition} variants={pageVariants} className="app">
            
            <div className='mt-5 mb-5 card col-xl-6 col-11'>
                <h2 className='p-3'>Add An Event!</h2>
            <form id='event-form' className='mt-5' onSubmit={this.handleSubmit}>
                <p>Title</p>
                    <div className="row no-gutters form-group mb-5">
                        <input className='col-md-4 form-control' type="text" name='title' value={this.state.title} onChange={this.handleChange} />
                    </div>
                <p>Category</p>
                <div className="row no-gutters form-group mb-5">
                    <select className="form-control col-md-4" onChange={this.onChange}>
                        <option value="Hangout">Hangout</option>
                        <option value="Band Event">Band Event</option>
                        <option value="Jam Sesh">Jam Sesh</option>
                    </select>
                    </div>
                <p>Description</p>
                    <div className="row no-gutters form-group mb-5">
                        <textarea className='col-md-4 form-control' type="text" name='description' value={this.state.description} onChange={this.handleChange}></textarea>
                    </div>
                <p>Location</p>
                    <div className="row no-gutters form-group mb-5">
                        <input className='col-md-4 form-control' type="text" name='location' value={this.state.location} onChange={this.handleChange} />
                    </div>
                <p>Add an Image</p>
                    <div className="row no-gutters form-group mb-5">
                        <input className='col-md- m-auto' type="file" name='image' onChange={this.handleImage} />
                {this.state.image ? (
                    <img id='preview' src={this.state.preview} alt="preview"/>
                ) : (
                    null
                )
                }
                    </div>
                <button className='btn btn-primary mt-5'>Save Event</button>
            </form>
            </div>
            </motion.div>
            </React.Fragment>
        )
    }
}

export default EventForm
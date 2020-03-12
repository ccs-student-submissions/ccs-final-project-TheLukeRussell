import React, {Component} from 'react';
import Header from './Header'
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class UpdateEventForm extends Component{
    state = {
        title: '',
        // image: null,
        location: '',
        description: '',
        category: '',
        // preview: '',
        }

    componentDidMount() {
        if(this.props.editEvent){
            this.setState({
                title: this.props.eventEditing.title,
                description: this.props.eventEditing.description,
                location: this.props.eventEditing.location,
                category: this.props.eventEditing.category,
                // image: this.props.eventEditing.image,
                // preview: this.props.eventEditing.preview,
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
        updatedEvent.id = this.props.eventEditing.id
        this.props.updateEventSubmit(updatedEvent)
    }

    render(){
        return(
            <React.Fragment>
                <Header />
                <div className='mt-5 card col-xl-6 col-11'>
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
                {/* <p>Add an Image</p>
                    <div className="row no-gutters form-group mb-5">
                        <input className='col-md- m-auto' type="file" name='image' onChange={this.handleImage} />
                {this.state.image ? (
                    <img id='preview' src={this.state.preview} alt="preview"/>
                ) : (
                    null
                )
                }
                    </div> */}
                <button className='btn btn-primary mt-5'>Save Event</button>
            </form>
            </div>
                </React.Fragment>
        )
    }
}

export default UpdateEventForm;
import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'
import UpdateEventForm from './UpdateEventForm'
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSFRToken'
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;

class EventItem extends Component {


    render() {
        if (this.props.user.pk === this.props.creator) {
        return(
            <Card key={this.props.event.id} className='col-md-4 mb-5' id='event-card'>
                <Card.Img variant="top" src={this.props.event.image} />
                <Card.Body>
                    <Card.Text>{this.props.event.title}</Card.Text>
                    <Button onClick={() => this.handleDelete(this.props.event)} className='btn btn-danger'>Delete</Button>
                    <Button onClick={() => this.editEvent(this.props.event)} className='btn btn-primary'>Edit</Button>
                    <Link to={`/events/${this.props.event.id}/`}><button className='btn btn-success'>View Event</button></Link>
                </Card.Body>
            </Card>
        )
        }else {
            return(
                <Card key={this.props.event.id} className='col-md-4 mb-5' id='event-card'>
                    <Card.Img variant="top" src={this.props.event.image} />
                    <Card.Body>
                        <Card.Text>{this.props.event.title}</Card.Text>
                        <Link to={`/events/${this.props.event.id}/`}><button className='btn btn-success'>View Event</button></Link>
                    </Card.Body>
                </Card>
            )
            }
    } 
}

class EventList extends Component {

    state = {
        events: [],
        editingEvent: false,
        eventEditing: {},
        user: '',
    }

    componentDidMount() {

        axios.get(`/api/v1/events`)
            .then(res => this.setState({events: res.data}))
            .catch(error => {
                console.log(error);
            })

        axios.get(`/api/v1/rest-auth/user/`)
            .then (res => this.setState({user: res.data}))
            .catch(error => {
                console.log(error);
            })
        }

    handleDelete = (event) => {
        axios.delete(`/api/v1/events/${event.id}/`)
        .then(res => {
            let events = [...this.state.events]
            let ndx = events.indexOf(event)
            events.splice(ndx,1) 
            this.setState({events})
            })
        .catch(error => {
            console.log(error)
            })
        }

    editEvent(event){
        this.setState((prevState)=>({editingEvent: !prevState.editingEvent ,eventEditing:event}))
    }

    updateEventSubmit = (updateEvent) => {
        let formData = new FormData();
        for (var key in updateEvent) {
            formData.append(key, updateEvent[key]);
        }

        axios.patch(`/api/v1/events/${this.state.eventEditing.id}/`, formData ,{
            headers: {
                'Authorization': `Token ${JSON.parse(localStorage.getItem("my-app-user")).key}`,
                "content-type": "multipart/form-data"
            }
        }).then(res =>{
            let events = [...this.state.events]
            let eventEditing = events.find(eventEditing => {
                return eventEditing.id === res.data.id
            });
            eventEditing = Object.assign(eventEditing, res.data);

            this.setState((prevState)=>({editingEvent: !prevState.editingEvent,eventEditing:{}, }));

        }).catch(error => {
            console.log(error)
        });
    }

        

    render() {
        const events = this.state.events.map(event => (
                // <Card key={event.id} className='col-md-4 mb-5' id='event-card'>
                // <Card.Img variant="top" src={event.image} />
                // <Card.Body>
                //     <Card.Text>{event.title}</Card.Text>
                //     <Button onClick={() => this.handleDelete(event)} className='btn btn-danger'>Delete</Button>
                //     <Button onClick={() => this.editEvent(event)} className='btn btn-primary'>Edit</Button>
                //     <Link to={`/events/${event.id}/`}><button className='btn btn-success'>View Event</button></Link>
                // </Card.Body>
                // </Card>
                <EventItem key={event.id} event={event} user={this.state.user} creator={event.created_by.id} />
        ))

        if(this.state.editingEvent){
            return <UpdateEventForm editEvent={this.state.editingEvent} eventEditing={this.state.eventEditing} updateEventSubmit={this.updateEventSubmit}  />
        }
        return(
            <React.Fragment>
            <Header />
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="app">
            <h1>Events List</h1>
            <div className="row no-gutters"><a className='add-event-btn justify-content-center' href='/add-event/' className='btn btn-success m-auto'>Add Event</a></div>
            <div className='row no-gutters justify-content-center mt-5'>
            {events}
            </div>
            </motion.div>
            </React.Fragment>
        )
    }
}
export default EventList
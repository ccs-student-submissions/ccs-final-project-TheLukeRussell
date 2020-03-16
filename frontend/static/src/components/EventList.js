import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'
import UpdateEventForm from './UpdateEventForm'
import { Card, Button } from "react-bootstrap";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSFRToken'
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;


class EventList extends Component {

    state = {
        events: [],
        editingEvent: false,
        eventEditing: {},
    }

    componentDidMount() {

        axios.get(`/api/v1/events`)
            .then(res => this.setState({events: res.data}))
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
        console.log(this.state.events);
        const events = this.state.events.map(event => (
                <Card key={event.id} className='col-md-6 mb-5' id='event-card'>
                <Card.Img variant="top" src={event.image} />
                <Card.Body>
                <Card.Title>Title: </Card.Title>
                    <Card.Text>{event.title}</Card.Text>
                <Card.Title>Description: </Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                <Card.Title>Type: </Card.Title>
                    <Card.Text>{event.category}</Card.Text>
                <Card.Title>Location: </Card.Title>
                    <Card.Text>{event.location}</Card.Text>
                <Card.Title>Who Made It: </Card.Title>
                    <Card.Text>{event.created_by.username}</Card.Text>
                <Card.Title>Who's coming?!: </Card.Title>
                    <Card.Text>{event.attendees.username}</Card.Text>
                    <Button onClick={() => this.handleDelete(event)} className='mr-2 btn btn-danger'>Delete</Button>
                    <Button onClick={() => this.editEvent(event)} className=' ml-2 btn btn-primary'>Edit</Button>
                </Card.Body>
                </Card>
        ))

        if(this.state.editingEvent){
            return <UpdateEventForm editEvent={this.state.editingEvent} eventEditing={this.state.eventEditing} updateEventSubmit={this.updateEventSubmit}  />
        }
        return(
            <React.Fragment>
            <Header />
            <h1>Events List</h1>
            <div>
            {events}
            </div>
            </React.Fragment>
        )
    }
}
export default EventList
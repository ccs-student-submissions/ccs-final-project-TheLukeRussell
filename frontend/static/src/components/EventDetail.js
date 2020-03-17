import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'
import { Card } from "react-bootstrap";
import Comment from './Comment'


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;

class EventDetail extends Component {

    state = {

    }

    componentDidMount() {
        // console.log(JSON.parse(localStorage.getItem('my-app-user')).key)
        axios.get(`/api/v1/events/${this.props.match.params.id}/`, )
            .then(res => {
            console.log('res', res.data);
            this.setState(res.data);
            })
            .catch(error => {
            console.log(error);
        });
}

render() {
    // const attendees = this.state.attendees.map(attendee => (
    //     <div>{attendee.id}</div>
    // ))
    console.log(this.state.user);
    return(
        <React.Fragment>
        <Header />
        <Card key={this.state.id} className='col-md-6 mb-5' id='event-card'>
                <Card.Img variant="top" src={this.state.image} />
                <Card.Body>
                <Card.Title>Title: </Card.Title>
                    <Card.Text>{this.state.title}</Card.Text>
                <Card.Title>Description: </Card.Title>
                    <Card.Text>{this.state.description}</Card.Text>
                <Card.Title>Type: </Card.Title>
                    <Card.Text>{this.state.category}</Card.Text>
                <Card.Title>Location: </Card.Title>
                    <Card.Text>{this.state.location}</Card.Text>
                <Card.Title>Who Made It: </Card.Title>
                    <Card.Text></Card.Text>
                <Card.Title>Who's coming?!: </Card.Title>
                    <Card.Text></Card.Text>
                </Card.Body>
                </Card>
                <Comment />
        </React.Fragment>
    )
}

}

export default EventDetail
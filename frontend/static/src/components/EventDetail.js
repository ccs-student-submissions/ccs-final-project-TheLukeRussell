import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'
import { Card } from "react-bootstrap";
import Comment from './Comment'
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

class EventDetail extends Component {

    state = {
        attendees: [],
    }

    componentDidMount() {
        // console.log(JSON.parse(localStorage.getItem('my-app-user')).key)
        axios.get(`/api/v1/events/${this.props.match.params.id}/`, )
            .then(res => {
            // console.log('res', res.data);
            this.setState(res.data);
            })
            .catch(error => {
            console.log(error);
        });
}

render() {
    console.log(this.state);
    // const attendees = this.state.attendees.map(attendee => (
    //     <Card.Text key={attendee.id}>{attendee.username}</Card.Text>
    // ))
    return(
        <React.Fragment>
        <Header />
        <motion.div exit="out" animate="in" initial="out" transition={pageTransition} variants={pageVariants} className="app">
        <h1 className='mt-5'>Details of the Event!</h1>
        <div id='event-detail' className="justify-content-center row no-gutters mb-5">
            <div className="col-md-6">
                <Card key={this.state.id}>
                    <Card.Img variant="top" src={this.state.image} />
                    <Card.Body>
                    <Card.Title><i>Title: </i></Card.Title>
                        <Card.Text><strong>{this.state.title}</strong></Card.Text>
                    <Card.Title><i>Description: </i></Card.Title>
                        <Card.Text><strong>{this.state.description}</strong></Card.Text>
                    <Card.Title><i>Type: </i></Card.Title>
                        <Card.Text><strong>{this.state.category}</strong></Card.Text>
                    <Card.Title><i>Location: </i></Card.Title>
                        <Card.Text><strong>{this.state.location}</strong></Card.Text>
                    <Card.Title><i>Owner: </i></Card.Title>
                    {this.state.created_by && <Card.Text>{this.state.created_by.username}</Card.Text>}
                    {/* <Card.Title><i>Who's coming?!: </i></Card.Title>
                        {attendees} */}
                    </Card.Body>
                </Card>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3">
                <Comment />
            </div>
        </div>
        </motion.div>
        </React.Fragment>
    )
}

}

export default EventDetail
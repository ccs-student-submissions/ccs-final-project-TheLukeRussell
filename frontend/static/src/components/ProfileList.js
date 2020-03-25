import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSFRToken'
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;


class ProfileList extends Component {

    state = {
        profiles: [],
    }

    componentDidMount() {
        // console.log(JSON.parse(localStorage.getItem('my-app-user')).key)
        axios.get(`/api/v1/profile/`)
            .then(res => this.setState({profiles: res.data}))
            .catch(error => {
            console.log(error);
            });
        }  

    render() {
        // console.log(this.state);
        const profiles = this.state.profiles.map(profile => (
                <Card key={profile.id} className='mb-5 col-sm-9 col-md-7 col-lg-5 col-xl-3' id='profile-card'>
                <Card.Img variant="top" src={profile.avatar} />
                <Card.Body>
                <Card.Title>Name: </Card.Title>
                    <Card.Text>{profile.name}</Card.Text>
                <Card.Title>About: </Card.Title>
                    <Card.Text>{profile.about}</Card.Text>
                </Card.Body>
                <Link to={`/profile/detail/${profile.created_by.id}/`}>
                <button className='btn btn-dark mr-2'>View Profile</button>
                </Link>
                </Card>
        ))
        return(
            <React.Fragment>
                <Header />
                <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="app">
            <h1>Profiles List</h1>
            <div>{profiles}</div>
            </motion.div>
            </React.Fragment>
        )
    }
}
export default ProfileList

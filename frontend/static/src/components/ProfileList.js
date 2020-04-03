import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSFRToken'
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;

const pageVariants = {
    in: {
        opacity: 1,
        y:0,
        scale: 1
    },
    out: {
        opacity: 0,
        y: "-100%",
        scale: .8
    }
}
const pageTransition = {
    type: "tween",
    // ease: "anticipate",
    duration: 1
}


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
                <Card key={profile.id} className='m-5 col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-2' id='profile-card'>
                <Card.Img variant="top" src={profile.avatar} />
                <Card.Body>
                <Card.Title>Name: </Card.Title>
                    <Card.Text>{profile.name}</Card.Text>
                <Card.Title>About: </Card.Title>
                    <Card.Text>{profile.about}</Card.Text>
                </Card.Body>
                <Link to={`/profile/detail/${profile.created_by.id}/`}>
                <button className='btn btn-dark mr-2'>Profile</button>
                </Link>
                </Card>
        ))
        return(
            <React.Fragment>
                <Header />
                <motion.div exit="out" animate="in" initial="out" transition={pageTransition} variants={pageVariants} className="app">
            <h1>Musicians</h1>
            <div className='profile-list row no-gutters justify-content-center'>{profiles}</div>
            </motion.div>
            </React.Fragment>
        )
    }
}
export default ProfileList

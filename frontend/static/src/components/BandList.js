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
        y: 0,
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


class BandList extends Component {

    state = {
        bands: [],
    }

    componentDidMount() {
        // console.log(JSON.parse(localStorage.getItem('my-app-user')).key)
        axios.get(`/api/v1/band/`)
            .then(res => this.setState({bands: res.data}))
            .catch(error => {
            console.log(error);
            });
        }  

    render() {
        // console.log(this.state);
        const bands = this.state.bands.map(band => (
                <Card key={band.id} className='m-5 col-sm-9 col-md-7 col-lg-5 col-xl-3' id='profile-card'>
                <Card.Img variant="top" src={band.avatar} />
                <Card.Body>
                <Card.Title>Name: </Card.Title>
                    <Card.Text>{band.name}</Card.Text>
                <Card.Title>About: </Card.Title>
                    <Card.Text>{band.about}</Card.Text>
                </Card.Body>
                <Link to={`/band/detail/${band.created_by.id}/`}>
                <button className='btn btn-dark mr-2'>Profile</button>
                </Link>
                </Card>
        ))
        return(
            <React.Fragment>
                <Header />
                <motion.div exit="out" animate="in" initial="out" transition={pageTransition} variants={pageVariants} className="app">
            <h1>Bands/Artists</h1>
            <div className='profile-list row no-gutters justify-content-center'>{bands}</div>
            </motion.div>
            </React.Fragment>
        )
    }
}
export default BandList
import React, {Component} from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import {motion} from "framer-motion"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;

class Header extends Component {

    state = {
        move: false,
        profiles: [],
        user: '',
        users: [],
    }
    
    componentDidMount() {
        axios.get(`/api/v1/rest-auth/user/`)
            .then (res => this.setState({user: res.data}))
            .catch(error => {
                console.log(error);
            })
        }

    logout = () => {
        axios.post('/api/v1/rest-auth/logout/');
        localStorage.removeItem('my-app-user');
        this.setState({ move: true });
    }

    render() {
        // console.log(this.state)
        const { move } = this.state;
    if (move) {
        return <Redirect to='/' push={true} />
    }

    if (JSON.parse(localStorage.getItem('my-app-user')).user.band === null) {
        return(
            <React.Fragment>
            <div id='navbar' className="row no-gutters">
            <Link id='lit' to={`/profile/detail/${this.state.user.pk}`}><motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md' id='header-item'>Profile</motion.li></Link>
            <Link id='lit' to="/list/"><motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md' id='header-item'>Musicians</motion.li></Link>
            <Link id='lit' to="/band/"><motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md' id='header-item'>Bands/Artists</motion.li></Link>
            <Link id='lit' to="/events/"><motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md' id='header-item'>Events</motion.li></Link>
            <button id='lit' className='btn btn-link' onClick={this.logout}><motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md' id='header-item'>Logout</motion.li></button>
            </div>
            </React.Fragment>
        )
        } else {
            return(
                <React.Fragment>
                <div id='navbar' className="row no-gutters">
                <Link to={`/band/detail/${this.state.user.pk}`}><motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md' id='header-item'>Profile</motion.li></Link>
                <Link to="/list/"><motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md' id='header-item'>Musicians</motion.li></Link>
                <Link to="/band/"><motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md' id='header-item'>Bands/Artists</motion.li></Link>
                <Link to="/events/"><motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md' id='header-item'>Events</motion.li></Link>
                <button className='btn btn-link' onClick={this.logout}><motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md' id='header-item'>Logout</motion.li></button>
                </div>
                </React.Fragment>
            )
            }
}
}

export default Header
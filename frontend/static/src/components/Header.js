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
        const { move } = this.state;
    if (move) {
        return <Redirect to='/' push={true} />
    }

    return (
        <React.Fragment>
        {localStorage.getItem('my-app-user') ? (
            <div id='navbar' className="row no-gutters">
                <motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md-3' id='header-item'><Link to={`/profile/detail/${this.state.user.pk}`}>Profile</Link></motion.li>
                <motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md-3' id='header-item'><Link to="/list/">Connect</Link></motion.li>
                <motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md-3' id='header-item'><Link to="/events/">Events</Link></motion.li>
                <motion.li whileHover={{scale: 1.1}} whileTap={{scale:1}} className='col-md-3' id='header-item'><button className='btn btn-link' onClick={this.logout}>Logout</button></motion.li>
            </div>
        ) : (
            <div id='navbar' className="row no-gutters">
                <li id='header-item'><Link to="/login">Login</Link></li>
                <li id='header-item'><Link to="/signup">Signup</Link></li>
            </div>
        )}
        </React.Fragment>
    );
}
}

export default Header
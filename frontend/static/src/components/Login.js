import axios from 'axios';
import React, { Component } from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const pageVariants = {
    in: {
        opacity: 1,
        x:0,
        scale: 1
    },
    out: {
        opacity: 0,
        x: "-100%",
        scale: .8
    }
}
const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 1
}

class Login extends Component  {
    state = {
        username: '',
        email: '',
        password: '',
    };

    handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/v1/rest-auth/login/', this.state)
    .then(res => {
        localStorage.setItem('my-app-user', JSON.stringify(res.data));
        console.log('local storage', localStorage);
        this.props.history.push('/list/');
    })
    .catch(error => {
        console.log(error);
        alert('Invalid username or password, please try again.');
    });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        return(
            <React.Fragment>
                <div className="bg-image"></div>
            <motion.div exit="out" animate="in" initial="out" transition={pageTransition} variants={pageVariants} className="bg-text">
            <Navbar>
                <Nav className="m-auto">
                    <li id='header-item'><Link to="/">Back</Link></li>
                </Nav>
                </Navbar>
            <div id='signup-login' className="row no-gutters">
            <div className='login col-md'>
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit} method='post'>
                        <label htmlFor="username">Username</label><br/>
                            <input type="text" onChange={this.handleChange} value={this.state.username} name='username' placeholder='Enter Username' required/><br/>
                        <label htmlFor="email">Email</label><br/>
                            <input type="text" onChange={this.handleChange} value={this.state.email} name='email' placeholder='Enter Email' required/><br/>
                        <label htmlFor="password">Password</label><br/>
                            <input type="password" onChange={this.handleChange} value={this.state.password} name='password' placeholder='Enter Password' required/><br/>
                        <button className='btn btn-dark mt-3 mr-2'>Login</button>
                    </form>
            </div>
        </div>
        </motion.div>
        </React.Fragment>
        )
    }
}


export default Login
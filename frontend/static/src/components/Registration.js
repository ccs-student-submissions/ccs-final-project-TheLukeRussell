import axios from 'axios';
import React, { Component } from 'react';
import {motion} from "framer-motion"
import { Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const pageVariants = {
    in: {
        opacity: 1,
        x:0
    },
    out: {
        opacity: 0,
        x: "-100%"
    }
}

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 1
}

class Registration extends Component  {
    state = {
        username: '',
        email: '',
        password1: '',
        password2: '',
    };


    handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('/api/v1/rest-auth/registration/', this.state)
        .then(res => {
            console.log('signup', res);
            localStorage.setItem('my-app-user', JSON.stringify(res.data));
            this.props.history.push('/create/');
        })
        .catch(error => {
            console.log(error);
            alert('This username is taken, please try a different one.');
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        return(
            <React.Fragment>
                <div className="bg-image"></div>
            <motion.div exit="out" animate="in" initial="out" variants={pageVariants} transition={pageTransition} className="bg-text">
            <Navbar>
                <Nav className="m-auto">
                    <li id='header-item'><Link to="/">Back</Link></li>
                </Nav>
                </Navbar>
            <div id='signup-login' className="row no-gutters">
            <div className='login col-md-2'>
                    <h1>Signup</h1>
                    <form onSubmit={this.handleSubmit} method='post'>
                        <label htmlFor="username">Username</label><br/>
                            <input type="text" onChange={this.handleChange} value={this.state.username} name='username' placeholder='Enter Username' required/><br/>
                        <label htmlFor="email">Email</label><br/>
                            <input type="text" onChange={this.handleChange} name='email' value={this.state.email} placeholder='Enter Username' required/><br/>
                        <label htmlFor="password1">Password</label><br/>
                            <input type="password" onChange={this.handleChange} name='password1' value={this.state.password1} placeholder='Enter Password' required/><br/>
                        <label htmlFor="password2">Password</label><br/>
                            <input type="password" onChange={this.handleChange} name='password2' value={this.state.password2} placeholder='Confirm Password' required/><br/>
                        <button className='btn btn-dark mt-3 mr-2'>Signup</button>
                    </form>
            </div>
        </div>
        </motion.div>
        </React.Fragment>
        )
    }
}


export default Registration
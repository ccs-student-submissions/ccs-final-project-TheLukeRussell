import axios from 'axios';
import React, { Component } from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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
        this.props.history.push('/profile/');
    })
    .catch(error => {
        console.log(error);
    });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        return(
            <div className="app">
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
                        <button className='btn btn-success mt-3 mr-2'>Login</button>
                    </form>
            </div>
        </div>
        </div>
        )
    }
}


export default Login
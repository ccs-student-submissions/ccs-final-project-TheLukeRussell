import axios from 'axios';
import React, { Component } from 'react';


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

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
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        return(
            <div className="app">
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
                        <button className='btn btn-success mt-3 mr-2'>Signup</button>
                    </form>
            </div>
        </div>
        </div>
        )
    }
}


export default Registration
import React, {Component} from "react";
import { Nav, Navbar} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;

class Header extends Component {

    state = {
        move: false,
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
            <Navbar>
                <Nav className="m-auto">
                    <li id='header-item'><Link to="/profile/detail/5/">Profile</Link></li>
                    <li id='header-item'><Link to="/list/">Connect</Link></li>
                    <li id='header-item'><Link to="/events/">Events</Link></li>
                    <li id='header-item'><Link to="/add-event">Add an Event</Link></li>
                    <li id='header-item'><button className='btn btn-link' onClick={this.logout}>Logout</button></li>
                </Nav>
            </Navbar>
        ) : (
            <Navbar>
                <Nav className="m-auto">
                    <li id='header-item'><Link to="/login">Login</Link></li>
                    <li id='header-item'><Link to="/signup">Signup</Link></li>
                </Nav>
            </Navbar>
        )}
        </React.Fragment>
    );
}
}

export default Header
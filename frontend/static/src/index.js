import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import ProfileCreate from './components/ProfileCreate';
import ProfileDetail from './components/ProfileDetail';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.Fragment>
        <Router>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/signup' component={Registration}></Route>
                    <Route path='/events/' component={EventList}></Route>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/add-event' component={EventForm}></Route>
                    <Route exact path='/create/' component={ProfileCreate}></Route>
                    <Route exact path='/profile/' component={ProfileDetail}></Route>
                </Switch>
        </Router>
    </React.Fragment>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

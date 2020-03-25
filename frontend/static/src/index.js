import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import ProfileList from './components/ProfileList';
import ProfileCreate from './components/ProfileCreate';
import ProfileDetail from './components/ProfileDetail';
import EventDetail from './components/EventDetail';
import Spotify from './components/Spotify';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence, motion} from "framer-motion"
import * as serviceWorker from './serviceWorker';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const App = () => (
    <Router>
        <Route render={({ location }) => (
            <AnimatePresence exitBeforeEnter initial={false}>
                <Switch location={location} key={location.pathname}>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/signup' component={Registration}></Route>
                    <Route exact path='/events/' component={EventList}></Route>
                    <Route exact path='/events/:id/' component={EventDetail}></Route>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/add-event' component={EventForm}></Route>
                    <Route path='/spotify-test' component={Spotify}></Route>
                    <Route path='/list' component={ProfileList}></Route>
                    <Route exact path='/create/' component={ProfileCreate}></Route>
                    <Route exact path='/profile/detail/:id/' component={ProfileDetail}></Route>
                </Switch>
                </AnimatePresence>
        )}
        />
        </Router>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

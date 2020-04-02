import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Registration from './components/Registration';
import RegistrationBand from './components/RegistrationBand';
import ProfileList from './components/ProfileList';
import BandList from './components/BandList';
import ProfileCreate from './components/ProfileCreate';
import BandCreate from './components/BandCreate';
import BandDetail from './components/BandDetail';
import ProfileDetail from './components/ProfileDetail';
import EventDetail from './components/EventDetail';
import Spotify from './components/Spotify';
import EventList from './components/EventList';
import NotFoundPage from './components/NotFoundPage';
import EventForm from './components/EventForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AnimatePresence} from "framer-motion"
import * as serviceWorker from './serviceWorker';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const App = () => (
    <Router>
        <Route render={({ location }) => (
            <AnimatePresence exitBeforeEnter initial={false}>
                <Switch location={location} key={location.pathname}>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/signup-choice' component={Signup}></Route>
                    <Route path='/signup' component={Registration}></Route>
                    <Route path='/band-signup/' component={RegistrationBand}></Route>
                    <Route exact path='/events/' component={EventList}></Route>
                    <Route exact path='/events/:id/' component={EventDetail}></Route>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/add-event' component={EventForm}></Route>
                    <Route path='/spotify-test' component={Spotify}></Route>
                    <Route path='/list' component={ProfileList}></Route>
                    <Route exact path='/band' component={BandList}></Route>
                    <Route exact path='/create/' component={ProfileCreate}></Route>
                    <Route exact path='/band-create/' component={BandCreate}></Route>
                    <Route exact path='/profile/detail/:id/' component={ProfileDetail}></Route>
                    <Route exact path='/band/detail/:id/' component={BandDetail}></Route>
                    <Route component={NotFoundPage} />
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

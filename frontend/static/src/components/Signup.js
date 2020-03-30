import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { motion } from "framer-motion";

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

class Signup extends Component{

    render() {
    return (
        <React.Fragment>
        <div className="bg-image"></div>
        <motion.div exit="out" animate="in" initial="out" transition={pageTransition} variants={pageVariants} className="bg-text">
        <h1 id='title'>Are You a Musician or an Artist/Band?</h1>
        <Link to="/signup"><button className='btn btn-dark mr-2'>Musician</button></Link>
        <Link to="/band-signup"><button className='btn btn-dark ml-2'>Artist/Band</button></Link>
            </motion.div>
            </React.Fragment>
    );
    }
}

export default Signup; 
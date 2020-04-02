import React, {Component} from 'react';
class NotFoundPage extends Component{

    render(){
        return( 
            <div id='error'>
                <div id="error-text">
                <span>404</span>
                <p id='not-found'>PAGE NOT FOUND</p>
                <p className='hello' style={{textAlign:"center"}}>
                    <a className='back' href='/list/'>Go Home</a>
                </p>
                </div>
            </div>
        )
    }
}
export default NotFoundPage;
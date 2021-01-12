import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => {
    return ( 
        <article className="not-found container">
            <h1>404!</h1>
            <p>
                Content not found.
            </p>
            <p>
            <Link to="/">
                Return To Home
            </Link>
            </p>
        </article>
     );
}
 
export default NotFound;
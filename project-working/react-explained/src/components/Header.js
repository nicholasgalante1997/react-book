import React from 'react';
import { Link } from 'react-router-dom'

const Header = (props) => {
    return ( 
        <header className="App-header">
            <ul className="container">
                <li>
                    <Link to="/">
                        React Explained!
                    </Link>
                </li>
            </ul>
        </header>
     );
}
 
export default Header;
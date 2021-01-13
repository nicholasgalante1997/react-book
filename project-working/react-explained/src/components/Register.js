import React, {useState, useContext} from 'react';
import UserContext from '../context/UserContext'

const Register = (props) => {

    const [email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)
    
    const { onRegister } = useContext(UserContext)

    const handleRegister = (event) => {
        event.preventDefault();
        onRegister(email, password)
    }

    return ( 
        <form className="container" name="register" onSubmit={handleRegister}>
            <p>
                <label htmlFor="email">Email: </label>
                <input 
                    type="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </p>
            <p>
                <label htmlFor="password">Password: </label>
                <input 
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </p>
            <button type="submit" disabled={!email && !password}>
                Register
            </button>
        </form>
     );
}
 
export default Register;

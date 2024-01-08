import React, {useState} from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials){
    return fetch(`${process.env.REACT_APP_BACKEND_HOST}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())

}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password,
        });
        setToken(token);
    };

    return (
        <form className="container mt-5">
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Login</button>
        </form>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};

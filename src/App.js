import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
    const [token, setToken] = React.useState();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className='wrapper'>
            <Router>
                <Routes>
                    <Route path='/:action?/:uid?/' element={<Dashboard token={token}/>} />                
                </Routes>
            </Router>
        </div>
                
    )
}

export default App;
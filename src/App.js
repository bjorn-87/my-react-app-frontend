import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route
} from 'react-router-dom';

import Me from './Me.js';
import Reports from './Reports.js';
import {Login} from './Auth.js';
import Register from './Register.js';
import Create from './Create.js';
import Logo from './logo.svg';

import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <nav className="NavBar">
                        <img className="logo" src={Logo} alt="logo" />
                        <ul>
                            <li>
                                <Link to="/">Me</Link>
                            </li>
                            <li>
                                <Link to="/reports">Reports</Link>
                            </li>
                            <li>
                                <Link to="/login">Admin</Link>
                            </li>
                        </ul>
                    </nav>
                    <Route exact path="/" component={Me} />
                    <Route path="/reports" component={Reports} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/create" component={Create} />
                </header>
                <footer className="pageFooter">
                    <p>&copy; Björn Olsson 2020</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;

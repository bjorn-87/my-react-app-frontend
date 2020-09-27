import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import GetUrl from './GetUrl.js';

import "./Auth.css";
import "./Buttons.css";

var Auth = {
    token: "",
    user: ""
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.baseUrl = GetUrl();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            redirect: null,
            message: "",
            email: "",
            password: ""
        };
    }

    handleSubmit(event) {
        const payload = {
            email: this.state.email,
            password: this.state.password
        };
        // console.log(payload);

        fetch(`${this.baseUrl}login`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    Auth.token = res.data.token;
                    Auth.user = `Logged in as ${res.data.user.email}`;
                    this.setState({
                        message: res.data.message,
                        redirect: "/reports"
                    });
                } else {
                    this.setState({message: res.errors.detail});
                }
            });
        event.preventDefault();
    // alert(`submitted${this.state.email}`);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const redirect = this.state.redirect;

        if (redirect) {
            return <Redirect to={redirect} />;
        } else if (Auth.token) {
            return (
                <main className="loginPage">
                    <h3>{Auth.user}</h3>
                </main>
            );
        }
        return (
            <main className="loginPage">
                <h2>Logga in</h2>
                <p>{this.state.message}</p>
                <form className="input" onSubmit={this.handleSubmit}>
                    <label className="input-label">
                        E-Post
                    </label>
                    <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="E-post"
                        required
                        value={this.state.email}
                        onChange={this.handleChange} />
                    <label className="input-label">
                        Lösenord
                    </label>
                    <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Lösenord"
                        required
                        value={this.state.password}
                        onChange={this.handleChange} />
                    <input className="button green-button" type="submit" value="Login" />
                </form>
                <Link to="/register">Registrera användare</Link>
            </main>
        );
    }
}

export { Login, Auth };

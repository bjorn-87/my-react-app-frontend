import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

import "./Auth.css";

var Auth = {
    token: "",
    user: ""
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            redirect: null,
            message: "",
            email: "",
            password: ""
        }
    }

    handleSubmit(event) {
        const payload = {
            email: this.state.email,
            password: this.state.password
        }
        // console.log(payload);

        fetch('http://localhost:1337/login', {
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
            return <Redirect to={redirect} />
        } else if (Auth.token) {
            return (
                <main>
                <p>{Auth.user}</p>
                </main>
            )
        }
        return (
            <main>
            <p>{this.state.message}</p>
            <form className="LoginForm" onSubmit={this.handleSubmit}>
            <label>
                Logga in:
            </label>
            <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange} />
            <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange} />
            <input type="submit" value="submit" />
            </form>
            <Link to="/register">Registrera</Link>
            </main>
        )
    }

}

export { Login, Auth };

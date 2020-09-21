import React, { Component } from 'react';
import { Auth } from './Auth.js';
import { Redirect, Link } from 'react-router-dom';
import GetUrl from "./GetUrl.js";

import "./Input.css"
import "./Buttons.css"
import "./Create.css"

class Create extends Component {
    constructor(props) {
        super(props);

        this.baseUrl = GetUrl();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            text: "",
            week: 0,
            message: "",
            redirect: ""
        };
    }

    handleSubmit(event) {
        const payload =  {
            text: this.state.text,
            week: this.state.week
        }
        // console.log(payload);
        // console.log(Auth.token);

        fetch(`${this.baseUrl}reports`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "x-access-token": `${Auth.token}`
            },
            body: JSON.stringify(payload)
        })
        .then((response) => response.json())
        .then((res) => {
            // console.log(res);
            if (res.data) {
                this.setState({
                    message: res.data.msg,
                    redirect: "/reports/"
                });
            } else if (res.errors.detail === "SQLITE_CONSTRAINT: UNIQUE constraint failed: reports.week" ) {
                this.setState({message: "Posten finns redan, ändra veckonummer"});
            } else {
                this.setState({message: res.errors.detail});
            }
        });
        event.preventDefault();
        // alert("submit");
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        // console.log(this.state);

        this.setState({
            [name]: value
        });
        // console.log(this.state);
    }
    render() {
        const redirect = this.state.redirect;
        if (!Auth.token) {
            return <div className="createPage"><p>Logga in för att Skapa rapport</p></div>
        } else if (redirect) {
            return <Redirect to={redirect}/>
        }
        return (
            <div className="createPage">
            <h2>Skapa rapport</h2>
            <h3>{this.state.message}</h3>
            <form className="" onSubmit={this.handleSubmit}>
                <label className="input-label">
                    Vecka
                </label>
                <input
                    type="number"
                    className="input"
                    name="week"
                    min="1"
                    required
                    value={this.state.week}
                    onChange={this.handleChange} />
                <label className="input-label">
                    Text
                </label>
                <textarea
                    className="input-textarea"
                    name="text"
                    max="1000"
                    value={this.state.text}
                    onChange={this.handleChange} />
                <input className="button green-button" type="submit" value="submit" />
            </form>
            <Link to="/reports">Tillbaka</Link>
            </div>
        )
    }
}

export default Create;

import React, { Component } from 'react';
import { Auth } from './Auth.js';
// import { Redirect } from 'react-router-dom';
import GetUrl from './GetUrl.js';

import "./Input.css";
import "./Buttons.css";

class EditReport extends Component {
    constructor(props) {
        super(props);

        this.baseUrl = GetUrl();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            text: "",
            week: "",
            message: "",
            redirect: ""
        };
    }

    componentDidMount() {
        const week = this.props.match.params.id;

        fetch(`${this.baseUrl}reports/week/${week}`)
            .then((response) => response.json())
            .then((res) => {
                if (res.data.text) {
                    this.setState({
                        text: res.data.text,
                        week: res.data.week
                    });
                } else {
                    this.setState({
                        week: res.data.week
                    });
                }
            // setText(res.data.text);
            });
    }

    handleSubmit(event) {
        const payload =  {
            text: this.state.text,
            week: this.state.week
        };
        // console.log(payload);
        // console.log(Auth.token);

        fetch(`${this.baseUrl}reports/edit`, {
            method: 'PUT',
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
                        redirect: "/reports"
                    });
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
        // console.log(this.state);

        this.setState({
            text: value
        });
        // console.log(this.state.data.text);
    }
    render() {
        const week = this.props.match.params.id;

        if (!Auth.token) {
            return <p>Logga in för att editera</p>;
        }
        return (
            <div>
                <h3>{this.state.message}</h3>
                <form className="" onSubmit={this.handleSubmit}>
                    <label className="input-label">
                        Redigera week {week}
                    </label>
                    <textarea
                        className="input-textarea"
                        name="text"
                        value={this.state.text}
                        onChange={this.handleChange} />
                    <input className="button green-button" type="submit" value="submit" />
                </form>
            </div>
        );
    }
}

export default EditReport;

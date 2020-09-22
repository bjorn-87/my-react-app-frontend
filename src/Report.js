// import React, { useEffect, useState } from 'react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown/with-html';
import { Auth } from './Auth.js';
import GetUrl from './GetUrl.js';

import "./Buttons.css";

class Report extends Component {
    constructor(props) {
        super(props);
        this.baseUrl = GetUrl();
        this.EditLink = this.EditLink.bind(this);

        this.state = {
            text: ""
        };
    }

    componentDidMount() {
        const week = this.props.match.params.id;

        fetch(`${this.baseUrl}reports/week/${week}`)
        .then((response) => response.json())
        .then((res) => {
            // console.log(res);
            this.setState({
                text: res.data.text
            });
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            const week = this.props.match.params.id;

            fetch(`${this.baseUrl}reports/week/${week}`)
            .then((response) => response.json())
            .then((res) => {
                // console.log(res);
                this.setState({
                    text: res.data.text
                });
            })
        }
    }

    EditLink() {
        const week = this.props.match.params.id;
        if (Auth.token) {
            return <Link to={`/reports/edit/${week}`} className="button blue-button editButton">edit</Link>;
        }
        return "";
    }

    render() {
        const text = this.state.text;
        return (
            <div className="reportPage">
            <this.EditLink/>
            <ReactMarkdown source={text} escapeHtml={false} />
            </div>
        );
    }
}

export default Report;

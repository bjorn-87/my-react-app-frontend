import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';

import Report from './Report.js';
import { Login, Auth } from './Auth.js';
import EditReport from './EditReport.js';
import Register from './Register.js';
import GetUrl from './GetUrl.js';

import "./Reports.css";
import "./Buttons.css";

class Reports extends Component {
    constructor(props) {
        super(props);

        this.baseUrl = GetUrl();
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        };
    }

    componentDidMount() {
        fetch(`${this.baseUrl}reports/week/`)
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    isLoaded: true,
                    data: res.data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            );
    }

    render() {
        const {error, isLoaded, data } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <main className="reports">
                    <p>{Auth.user ? Auth.user : ""}</p>
                    <h2>Rapporter</h2>
                    <ul className="weekNav">
                        {data.map(week => (
                            <li key={week.week}>
                                <Link to={`/reports/week/${week.week}`}>week{week.week}</Link>
                            </li>
                        ))}
                        {Auth.token ? <Link to="/create" className="createButton green-button">Skapa rapport</Link> : ""}
                        <Switch>
                            <Route path="/reports/week/:id" component={Report} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/reports/edit/:id" component={EditReport} />
                        </Switch>
                    </ul>
                </main>
            );
        }
    }
}

export default Reports;

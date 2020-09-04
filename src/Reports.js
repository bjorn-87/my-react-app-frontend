import React from 'react';
import {Link, Route} from 'react-router-dom';

import Report from './Report.js';
import "./Reports.css";

function Reports() {
    return (
        <main className="reports">
        <h1>Här hittar ni rapporterna</h1>
        <ul>
            <li>
                <Link to="/reports/week/1">Week1</Link>
            </li>
        </ul>
        <Route path="/reports/week/:id" component={Report} />
        </main>
    );
}

export default Reports;

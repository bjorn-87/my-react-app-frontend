import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown/with-html';
import { Auth } from './Auth.js'

// import mdfile from './markdown/report1.md';

function Report({ match }) {
    const week = match.params.id;
    const [text, setText] = useState();

    useEffect(() => {
        fetch(`http://localhost:1337/reports/week/${week}`)
        .then((response) => response.json())
        .then((res) => {
            // console.log(res);
            setText(res.data.text);
        })
    });

    const EditLink = () => {
        if (Auth.token) {
            return <Link to={`/reports/edit/${match.params.id}`}>edit</Link>;
        }
        return "";
    }

    return (
        <div>
        <EditLink/>
        <ReactMarkdown source={text} escapeHtml={false} />
        </div>
    );
}

export default Report;

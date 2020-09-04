import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import "./Me.css";

import mdfile from './markdown/me.md';

class Me extends Component {
    constructor(props) {
        super(props)

        this.state = {terms: null}
    }

    componentDidMount() {
        fetch(mdfile)
        .then((response) => response.text())
        .then((text) => {
            this.setState({ terms: text})
        })
    };

    render() {
        return (
            <main className="info">
            <img className="me" src='me.jpg' alt="Bild på mig" />
            <ReactMarkdown source={this.state.terms} escapeHtml={false} />
            </main>
        );
    }
}

export default Me;



// import React from 'react';
//
//
// const Me = () => {
//     return (
//         <main className="info">
//             <h1>Me-sida i kursen jsramverk</h1>
//             <p>Mitt Namn är Björn</p>
//         </main>
//     );
// }
//
// export default Me;

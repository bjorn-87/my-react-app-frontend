import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown/with-html';

import mdfile from './markdown/report1.md';

class Report extends Component {
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
            <div>
            <ReactMarkdown source={this.state.terms} escapeHtml={false} />
            </div>
        );
    }
}

export default Report;

import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import "./Me.css";

// import mdfile from './markdown/me.md';

class Me extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            isLoaded: false,
            data: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:1337/")
        .then((response) => response.json())
        .then(
            (res) => {
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
        )
    }
    render() {
        // console.log(this.state.data.msg);
        return (
            <main className="info">
            <ReactMarkdown source={this.state.data.msg} escapeHtml={false} />
            </main>
        );
    }
}

export default Me;


// <img className="me" src='me.jpg' alt="Bild på mig" />

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

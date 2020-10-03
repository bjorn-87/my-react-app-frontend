import React, { Component } from 'react';
import io from 'socket.io-client';

import './Chat.css';

// const socket = io("http://localhost:8300");
const socket = io('https://socket-server.bjos19.me');

var chatSave = {
    user: "",
    messages: []
}

class Chat extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setUser = this.setUser.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.scrollRef = React.createRef();

        this.state = {
            newUser: "",
            user: "",
            messages: [],
            message: ""
        };
    }

    componentDidMount() {
        this.setState({
            user: chatSave.user,
            messages: chatSave.messages
        })
        // console.log(chatSave.messages);
        socket.on('connect', function(data) {
            console.log("connected");
        });

        socket.on('chat message', ({ time, user, msg }) => {
            this.setState({
                messages: [...this.state.messages, `${time} ${user}: ${msg}`]
            });
            chatSave.messages = this.state.messages;
            this.scrollToBottom();
        });
    }

    scrollToBottom() {
        let scroll = this.scrollRef.current;

        if (scroll) {
            scroll.scrollTop = scroll.scrollHeight;
        }
    }

    setUser(event) {
        this.setState({
            user: this.state.newUser
        });
        chatSave.user = this.state.newUser;
        socket.emit("chat message", {
            user: this.state.newUser,
            message: `Joined the chat`
        })
        event.preventDefault();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.message) {
            // console.log("submit");
            socket.emit("chat message", {
                message: this.state.message,
                user: this.state.user,
            });
            this.setState({ message: "" });
        }
    }


    render() {
        const user = this.state.user;
        const messages = this.state.messages;

        if (!chatSave.user) {
            return (
                <div className="chatPage">
                <div>
                    <form onSubmit={this.setUser}>
                    <label>
                        Set Nickname:
                    </label>
                <input
                    name="newUser"
                    className="new-message"
                    value={this.state.newUser}
                    onChange={this.handleChange}
                    autoFocus />
                </form>
                </div>
                </div>
            );
        } else {
            return (
                <div className="chatPage">
                    <h1>Chat</h1>
                    <p>Nick: {user}</p>
                    <div ref={this.scrollRef} id="all-messages" className="all-messages">
                        {messages.map(function (data, index) {
                            return <p key={index}>
                            {data}
                            </p>
                        })}
                    </div>
                    <div>
                        <form
                            onSubmit={this.handleSubmit}
                        >
                            <input
                                id="new-message"
                                className="new-message"
                                name="message"
                                value={this.state.message}
                                onChange={this.handleChange}
                                placeholder="Skriv här, tryck Enter för att skicka"
                                autoFocus
                            />
                        </form>
                    </div>
                </div>
            );

        }
    };
}



export default Chat;

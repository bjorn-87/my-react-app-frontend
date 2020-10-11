import React, { Component } from 'react';
import io from 'socket.io-client';

import './Chat.css';

// const socket = io("http://localhost:8300");
const socket = io('https://socket-server.bjos19.me');
// const chat = "http://localhost:8300/list";
const chat = "https://socket-server.bjos19.me/list";

var chatSave = {
    user: ""
};

class Chat extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setUser = this.setUser.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.scrollRef = React.createRef();

        this.state = {
            error: null,
            newUser: "",
            user: "",
            messages: [],
            message: ""
        };
    }

    componentDidMount() {
        fetch(chat)
            .then((response) => response.json())
            .then((res) => {
                res.forEach((item) => {
                    this.setState({
                        messages: [...this.state.messages, `${item.time} ${item.user}: ${item.msg}`]
                    });
                });
            },
            (error) => {
                this.setState({
                    error
                });
            });

        this.setState({
            user: chatSave.user,
        });

        socket.on('connect', function() {
            console.log("connected");
        });

        socket.on('chat message', ({ time, user, msg }) => {
            this.setState({
                messages: [...this.state.messages, `${time} ${user}: ${msg}`]
            });
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
        });
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
            socket.emit("chat message", {
                message: this.state.message,
                user: this.state.user,
            });
            this.setState({ message: "" });
        }
    }


    render() {
        const {error, user, messages} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!chatSave.user) {
            return (
                <div className="chatPage">
                    <div>
                        <form onSubmit={this.setUser}>
                            <label>
                                Välj användarnamn:
                            </label>
                            <input
                                name="newUser"
                                className="new-message"
                                value={this.state.newUser}
                                onChange={this.handleChange}
                                placeholder="Skriv in användarnamn och tryck Enter"
                                autoFocus />
                        </form>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="chatPage">
                    <h2>Chat</h2>
                    <p>Inloggad som: {user}</p>
                    <div ref={this.scrollRef} id="all-messages" className="all-messages">
                        {messages.map((data, index) => (
                            <p key={index}>
                                {data}
                            </p>
                        ))}
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
    }
}



export default Chat;

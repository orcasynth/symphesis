import React from 'react';
import io from 'socket.io-client';

const socket = io();

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
      socket.emit('room', {room: 'yolt'})
    }

    render() {

    }
}

export default Room;

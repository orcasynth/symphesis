import React from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {} from './actions';
import './index.css';

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

const mapStateToProps = (state)  => ({
})

export default connect(mapStateToProps)(Room);


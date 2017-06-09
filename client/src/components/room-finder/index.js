import React from 'react';
import * as Cookies from 'js-cookie';
import {connect} from 'react-redux';
import {} from './actions';
import './index.css';

import io from 'socket.io-client';
const socket = io();
export default class RoomFinder extends React.Component {
    constructor(props) {
        super(props);
        socket.on('message', msg => console.log(msg))
        socket.on('checkroom', info => console.log(info))
    }
    componentWillMount() {
    }
    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        fetch('/api/questions', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(questions =>
            this.setState({
                questions
            })
        );
    }

    render() {
        return (
            <div>
                <button onClick={() => socket.emit('message', {room: 'yolt', message: 'greetings from mars'})}>msg</button> 
                <button onClick={() => socket.emit('room', {room: 'yolt'})}>joinroom</button> 
                <button onClick={() => socket.emit('checkroom', {room: 'yolt'})}>checkroom</button> 
                <button onClick={() => socket.emit('leave', {room: 'yolt'})}>leaveroom</button>
            </div>
        );
    }
}

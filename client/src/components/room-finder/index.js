import React from 'react';
import * as Cookies from 'js-cookie';
import {connect} from 'react-redux';
import {getAvailableRooms, setRoom} from './actions';
import './index.css';

import io from 'socket.io-client';
const socket = io();
export class RoomFinder extends React.Component {
    constructor(props) {
        super(props);
        socket.on('message', msg => console.log(msg))
        socket.on('checkRooms', rooms => this.props.dispatch(getAvailableRooms(rooms)))
        socket.on('hasJoined', room => this.props.dispatch(setRoom(room)))
    }

    componentDidMount() {
        socket.emit('checkRooms')
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
        let rooms = [];
        for (let key in this.props.availableRooms) {
            let obj = this.props.availableRooms;
            let name = key;
            let number = (obj[key] < 6) ? obj[key] : "Full";
            rooms.push(<li key={name}>Room {name}: {number}</li>)
        }
        if (rooms.length < 1) {
            rooms = (<li>No rooms exist</li>)
        }
        return (
            <div>
                {/*<form onSubmit={e => this.createRoom(e)}>

                </form>*/}
                <button onClick={() => socket.emit('message', {room: 'yolt', message: 'greetings from mars'})}>msg</button> 
                <button onClick={() => socket.emit('room', {room: 'yolt'})}>joinroom</button> 
                <button onClick={() => socket.emit('checkRooms', {room: 'yolt'})}>checkroom</button> 
                <button onClick={() => socket.emit('leave', {room: 'yolt'})}>leaveroom</button>
                <ul>
                    {rooms}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state)  => ({
    availableRooms: state.roomFinder.availableRooms, 
    room: state.roomFinder.room
})

export default connect(mapStateToProps)(RoomFinder);

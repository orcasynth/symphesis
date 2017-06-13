import React from 'react';
import { connect } from 'react-redux';
import { getAvailableRooms, setRoom, socketError, leaveRoom } from './actions';
import './index.css';
import RoomFinder from '../room-finder';
import Room from '../room';
import io from 'socket.io-client';

const socket = io();

export class SocketWrapper extends React.Component {
  constructor(props) {
    super(props);
    socket.on('message', msg => console.log(msg));
    socket.on('checkRooms', rooms => this.props.dispatch(getAvailableRooms(rooms)));
    socket.on('hasJoined', room => this.props.dispatch(setRoom(room)));
    socket.on('roomError', error => this.props.dispatch(socketError(error)))
  }

  componentDidMount() {
    socket.emit('checkRooms')
  }

  leaveRoom() {
    socket.emit('leave', { room: this.props.room })
    this.props.dispatch(leaveRoom())
  }

  createRoom() {
    socket.emit('createRoom');
  }

  joinRoom(room) {
    socket.emit('joinRoom', { room })
  }

  render() {
    if (!this.props.room) {
      return <RoomFinder createRoom={(e) => this.createRoom(e)} joinRoom={(room) => this.joinRoom(room)} />
    }
    return <Room leaveRoom={() => this.leaveRoom()} />
  }
}

const mapStateToProps = (state) => ({
  availableRooms: state.socketWrapper.availableRooms,
  room: state.socketWrapper.room,
  socketError: state.socketWrapper.socketError
})

export default connect(mapStateToProps)(SocketWrapper);

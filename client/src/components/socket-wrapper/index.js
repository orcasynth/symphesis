import React from 'react';
import { connect } from 'react-redux';
import { getAvailableRooms, setRoom, socketError, leaveRoom, joinRoom, createRoom, listRooms } from './actions';
import '../../middleware/socketMiddleware';
import './index.css';
import RoomFinder from '../room-finder';
import Room from '../room';
// import io from 'socket.io-client';

// const socket = io();

export class SocketWrapper extends React.Component {

  componentDidMount() {
    this.props.dispatch(listRooms())
  }

  leaveRoom() {
    this.props.dispatch(leaveRoom())
  }

  createRoom() {
    // console.log('wrapper socket:', socket.id)
    this.props.dispatch(createRoom())
  }

  joinRoom(room) {
    this.props.dispatch(joinRoom(room))
  }

  render() {
    if (!this.props.room) {
      return <RoomFinder 
        createRoom={(e) => this.createRoom(e)} 
        listRooms={() => this.listRooms()} 
        joinRoom={(room) => this.joinRoom(room)} 
      />
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

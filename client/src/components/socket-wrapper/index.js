import React from 'react';
import { connect } from 'react-redux';
import { leaveRoom, joinRoom, createRoom, listRooms } from './actions';
import '../../middleware/socketMiddleware';
import './index.css';
import RoomFinder from '../room-finder';
import Room from '../room';

export class SocketWrapper extends React.Component {

  componentDidMount() {
    this.props.dispatch(listRooms())
  }

  leaveRoom() {
    this.props.dispatch(leaveRoom(this.props.room))
  }

  createRoom() {
    this.props.dispatch(createRoom())
  }

  joinRoom(room) {
    this.props.dispatch(joinRoom(room))
  }

  render() {
    if (!this.props.room) {
      return (
      <div>
        <a href="/api/auth/logout">Sign out?</a>
        <RoomFinder 
        createRoom={(e) => this.createRoom(e)} 
        listRooms={() => this.listRooms()} 
        joinRoom={(room) => this.joinRoom(room)} 
      />
      </div>)
    }
    return (<div><a href="/api/auth/logout">Sign out?</a><Room leaveRoom={() => this.leaveRoom()} /></div>)
  }
}

const mapStateToProps = (state) => ({
  availableRooms: state.socketWrapper.availableRooms,
  room: state.socketWrapper.room,
  socketError: state.socketWrapper.socketError
})

export default connect(mapStateToProps)(SocketWrapper);

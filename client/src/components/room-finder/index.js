import React from 'react';
import { connect } from 'react-redux';
import './index.css';

export class RoomFinder extends React.Component {
  render() {
    let rooms = [];
    for (let key in this.props.availableRooms) {
      let obj = this.props.availableRooms;
      let number = (obj[key] < 6) 
        ? obj[key]
        : "Full";
      rooms.push(
      <li key={key}> 
        <h1 onClick={() => this.props.joinRoom(key)}>Room {key}: <span>{number}</span> </h1>
      </li>)
    }
    let socketError = (this.props.socketError) 
      ? (<li>Error: {this.props.socketError}</li>) 
      : ''
    return (
      <div>
        <ul className="socket-display">
          <li><h1 onClick={() => this.props.createRoom()}>CREATE A ROOM</h1></li>
          {socketError}
          {rooms}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  availableRooms: state.socketWrapper.availableRooms,
  room: state.socketWrapper.room,
  socketError: state.socketWrapper.socketError
})

export default connect(mapStateToProps)(RoomFinder);

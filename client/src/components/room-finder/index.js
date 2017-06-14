import React from 'react';
import { connect } from 'react-redux';
import './index.css';

export class RoomFinder extends React.Component {
  constructor(props) {
    super(props);
    this.props.receiveRoomList();
  }

  componentDidMount() {
    this.props.listRooms();
  }

  render() {
    let rooms = [];
    for (let key in this.props.availableRooms) {
      let obj = this.props.availableRooms;
      let number = (obj[key] < 6) 
        ? obj[key]
        : "Full";
      rooms.push(
      <li key={key}> Room {key}: {number}
        <button onClick={() => this.props.joinRoom(key)}>Join</button>
      </li>)
    }
    if (rooms.length < 1) {
      rooms = (<li>No rooms exist</li>)
    }
    let socketError = (this.props.socketError) 
      ? (<li>Error: {this.props.socketError}</li>) 
      : ''
    return (
      <div>
        <button onClick={() => this.props.createRoom()}>Create a new room</button>
        <ul>
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

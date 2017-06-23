import React from 'react';
import { connect } from 'react-redux';
import {displayModal} from './actions';
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
    let modal;
    if (this.props.displayModal) {
      modal = (
      <div className='overlay'>
        <div className="overlay-child">
        <h2>
          SYMPHESIS is a collaborative music-making web app. Join a room with your old friends or new friends, pick your instruments, make your recording and go! The app will loop your music and combine it with everyone else's. To record, click on the + button and wait for the countdown. If you like how your loop mashes up with everyone else's, press the send button to send it to everyone else!
        </h2>
        </div>
        <a className="modal-btn" onClick={() => this.props.dispatch(displayModal())}>X</a>
      </div> 
      )
    } 
    return (
      <div>
        <a className="modal-btn" onClick={() => this.props.dispatch(displayModal())}>WHAT IS THIS?</a>
        <ul className="socket-display">
          <li><h1 onClick={() => this.props.createRoom()}>CREATE A ROOM</h1></li>
          {socketError}
          {rooms}
        </ul>
        {modal}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  availableRooms: state.socketWrapper.availableRooms,
  room: state.socketWrapper.room,
  socketError: state.socketWrapper.socketError,
  displayModal: state.roomFinder.displayModal
})

export default connect(mapStateToProps)(RoomFinder);

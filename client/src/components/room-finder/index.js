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
      <div className="overlay" onClick={() => this.props.dispatch(displayModal())}>
        <div className="overlay-child" >
        <h2>
          SYMPHESIS is a collaborative music-making web app.
        </h2>
        <ol className="instruction-list"> 
          <li>Join a room with your old friends or new friends, pick your instruments, make your recording and go!
          </li>
  
          <li> The app will loop your music and combine it with everyone else's.
          </li>
          
          <li>To record, click on the <i className="fa fa-plus-circle fa-1x" aria-hidden="true" ></i> button and wait for the countdown. 
          </li>

          <li> If you like how your loop mashes up with everyone else's, press the send button to send it to everyone else!
          </li>
        </ol>
        <p className="exit-message">
        Click anywhere to exit!
        </p>
        </div>

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

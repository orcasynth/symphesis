import React from 'react';
import { connect } from 'react-redux';
import { } from './actions';
import Metronome from '../metronome';
import './index.css';
import Keyboard from '../keyboard'



class Room extends React.Component {
  render() {
    return (
      <div>You are user {this.props.displayName} in room {this.props.room}
        <button onClick={() => this.props.leaveRoom()}>click to Brexit</button>
        <Metronome />
        <Keyboard />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  room: state.socketWrapper.room,
  displayName: state.socketWrapper.displayName
})

export default connect(mapStateToProps)(Room);


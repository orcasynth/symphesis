import React from 'react';
import { connect } from 'react-redux';
import { } from './actions';
import AudioWrapper from '../audio-wrapper';
import './index.css';
import Keyboard from '../keyboard';
import Drums from '../drums';



class Room extends React.Component {
  render() {
    return (
      <div>You are user {this.props.displayName} in room {this.props.room}
        <button onClick={() => this.props.leaveRoom()}>click to Brexit</button>
        <AudioWrapper />
        <Drums />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  room: state.socketWrapper.room,
  displayName: state.socketWrapper.displayName
})

export default connect(mapStateToProps)(Room);


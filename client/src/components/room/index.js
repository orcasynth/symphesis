import React from 'react';
import { connect } from 'react-redux';
import { } from './actions';
import AudioWrapper from '../audio-wrapper';
import './index.css';
import FontAwesome from 'react-fontawesome';

class Room extends React.Component {
  render() {
    return (
      <div>  👤 user: {this.props.displayName} <br></br>
      <FontAwesome
        name="user-o"
        size="2x"
      /> 
        🚪 room: {this.props.room} <button onClick={() => this.props.leaveRoom()}>exit room</button><br></br>

        <AudioWrapper />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  room: state.socketWrapper.room,
  displayName: state.socketWrapper.displayName
})

export default connect(mapStateToProps)(Room);


import React from 'react';
import { connect } from 'react-redux';
import { } from './actions';
import AudioWrapper from '../audio-wrapper';
import './index.css';
import FontAwesome from 'react-fontawesome';

class Room extends React.Component {
  render() {
    return (
      <div>
        <div className="location">  
        {/*<i className="fa fa-user-o" aria-hidden="true"></i> user: {this.props.displayName} <br></br>*/}
        <i className="fa fa-map-marker fa-lg" aria-hidden="true"></i> {this.props.room} <button onClick={() => this.props.leaveRoom()}>exit room</button><br></br>
        </div>

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


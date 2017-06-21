import React from 'react';
import { connect } from 'react-redux';
import { setMicIsRecording } from './actions';

export class Mic extends React.Component{

  render() {
    return (
      <div className="mic-component">
        <canvas className="visualizer"></canvas>
        <button className="record" onClick={() => setMicIsRecording(true)} >RECORD</button>
        <button className="stop" onClick={() => setMicIsRecording(false)} >STOP</button>
        <div className="sound-clips"></div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    setMicIsRecording: (isRecording) => {
      dispatch(setMicIsRecording(isRecording));
    },
})

export default connect(mapDispatchToProps)(Mic);
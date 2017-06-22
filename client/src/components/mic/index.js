import React from 'react';
import { connect } from 'react-redux';
import { setMicIsRecording, setMicNotRecording } from './actions';

export class Mic extends React.Component{

  render() {
    return (
      <div className="mic-component">
        <canvas className="visualizer"></canvas>
        <button className="record" onClick={() => this.props.dispatch(setMicIsRecording(true))} >RECORD</button>
        <button className="stop" onClick={() => this.props.dispatch(setMicNotRecording(false))} >STOP</button>
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

export default connect()(Mic);
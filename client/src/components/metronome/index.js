import React from 'react'
import { connect } from 'react-redux'
import { setIsPlaying, setNotPlaying, sendRecording, startRecording, stopRecording, requestToRecord } from './actions'
import './index.css'

class Metronome extends React.Component {
  // componentWillMount() {
  //   this.audioContext = new AudioContext()
  //   let timerID = 0
  // }

  componentDidMount () {
    this.play();
  }

  componentWillUnmount() {
    this.stop();
  }

  play() {
    this.props.dispatch(setIsPlaying(this.props.bpm, this.props.timeSignature))
  }

  stop() {
    this.props.dispatch(setNotPlaying())
  }

  sendRecording () {
    this.props.dispatch(sendRecording(this.props.room))
  }

  render() {
    let roommates = [];
    for (let user in this.props.roommates) {
      if (this.props.roommates[user].displayName) {
        let thatsYou = (this.props.displayName === this.props.roommates[user].displayName) ? 
          "(that's you!)" :
          null;
        roommates.push(<li key={user}>{this.props.roommates[user].displayName} {thatsYou}</li>)
      }
    }

    let sendRecording = (this.props.enableSendRecording) ? 
      (<button onClick={() => this.sendRecording()}>send recording</button>) :
      null;

    return (
      <div>
        {sendRecording}
        <button onClick={() => this.props.dispatch(requestToRecord())}>req record</button>
        <button onClick={() => this.props.dispatch(startRecording())}>start recording</button>
        <button onClick={() => this.props.dispatch(stopRecording())}>stop recording</button>
        <div className="play-button" onClick={() => this.play()}> > </div>
        <div className="stop-button" onClick={() => this.stop()}> > </div>
        <p>{this.props.recordingMessage}</p>
        <p>Roommates</p>
        <ul>{roommates}</ul>
      </div>
    )
  }
}

const mapStateToProps = function (state, props) {
  return {
    isPlaying: state.metronome.isPlaying,
    bpm: state.metronome.bpm,
    timeSignature: state.metronome.timeSignature,
    room: state.socketWrapper.room,
    displayName: state.socketWrapper.displayName,
    roommates: state.metronome.roommates,
    recording: state.metronome.recording,
    recordingMessage: state.metronome.recordingMessage,
    enableSendRecording: state.metronome.enableSendRecording
  }
}

export default connect(mapStateToProps)(Metronome)

import React from 'react'
import { connect } from 'react-redux'
import { setIsPlaying, setNotPlaying, sendRecording } from './actions'
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
    this.props.dispatch(sendRecording('hi', this.props.room))
  }
  render() {
    return (
      <div>
        <button onClick={() => this.sendRecording()}>send recording</button>
        <div className="play-button" onClick={() => this.play()}> > </div>
        <div className="stop-button" onClick={() => this.stop()}> > </div>
      </div>
    )
  }
}

const mapStateToProps = function (state, props) {
  return {
    isPlaying: state.metronome.isPlaying,
    bpm: state.metronome.bpm,
    timeSignature: state.metronome.timeSignature,
    currentSubdivision: state.metronome.currentSubdivision,
    nextTickTime: state.metronome.nextTickTime,
    currentTime: state.metronome.currentTime,
    timerID: state.metronome.timerID,
    room: state.socketWrapper.room,
  }
}

export default connect(mapStateToProps)(Metronome)

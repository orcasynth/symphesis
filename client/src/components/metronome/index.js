import React from 'react'
import { connect } from 'react-redux'
import { setIsPlaying, setNotPlaying } from './actions'
import './index.css'

class Metronome extends React.Component {
  componentWillMount() {
    this.audioContext = new AudioContext()
    let timerID = 0
  }

  componentDidMount () {
    this.props.dispatch(setIsPlaying(this.props.bpm, this.props.timeSignature))
  }

  componentWillUnmount() {
    this.props.dispatch(setNotPlaying())
  }

  play() {
    this.props.dispatch(setIsPlaying(this.props.bpm, this.props.timeSignature))
  }

  stop() {
    this.props.dispatch(setNotPlaying())
  }

  render() {
    return (
      <div>
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
    timerID: state.metronome.timerID
  }
}

export default connect(mapStateToProps)(Metronome)

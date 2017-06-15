import React from 'react'
import { connect } from 'react-redux'
import { setIsPlaying, setNotPlaying } from './actions'
import './index.css'

class Metronome extends React.Component {
  componentWillMount() {
    this.audioContext = new AudioContext()
    let timerID = 0
  }

  //function that updates currentSubdivision and the next tick and starts time via audioContext.

  //function that plays a note at a specific time.
  scheduleNote(beatDivisionNumber, time) {
    let osc = this.audioContext.createOscillator();
    let amp = this.audioContext.createGain();
    osc.connect(amp);
    amp.connect(this.audioContext.destination);

    amp.gain.value = .05;
    osc.frequency.value = 208;

    if (this.props.currentSubdivision % 16 === 0) {
      amp.gain.value = .6;
      osc.frequency.value = 224;
    }
    else if (this.props.currentSubdivision % 4 === 0) {
      amp.gain.value = .2;
      osc.frequency.value = 216;
    }
    osc.start(time);
    osc.stop(time + 0.1);
    console.log(this.props.currentSubdivision);
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

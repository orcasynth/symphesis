import React from 'react';
import { connect } from 'react-redux';
import Key from '../keyboard/key';
import { startPlaying, stopPlaying, recordNote, stopRecordingNote } from '../audio-wrapper/actions';
import convertFromKeycode from '../../utilities/convertFromKeycode';
import convertToDetune from '../../utilities/convertToDetune';
import './index.css'

class BassSynth extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.state = {};
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown)  
    document.addEventListener("keyup", this.onKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown)
    document.removeEventListener("keyup", this.onKeyUp)
  }

  onKeyDown(event) {
    if (!this.state[event.key]) {
      let note = convertFromKeycode(event.key, this.props.instrument)
      if (note) {
        if (this.props.recording) {
          this.props.recordNote(this.props.instrument, convertToDetune(note))
        }
        this.props.startPlaying(this.props.instrument, convertToDetune(note), note)
      }
    }
    this.setState(prevState => {
      let obj = {};
      obj[event.key] = true;
      return obj;
    })
  }

  onKeyUp(event) {
    this.setState(prevState => {
      let obj = {};
      obj[event.key] = false;
      return obj;
    })
    let note = convertFromKeycode(event.key, this.props.instrument)
    if (note) {
      if (this.props.recording) {
        this.props.stopRecordingNote(this.props.instrument, convertToDetune(note))
      }
      this.props.stopPlaying(this.props.instrument, convertToDetune(note), note)
    }
  }
  render() {
    return (

      <div id="keyboard" className="bass-synth" >
        <div id="keyboard-row">
          <Key note="C#1" />
          <Key note="D#1" className="space-between"/>
          <Key note="F#1" />
          <Key note="G#1" />
          <Key note="A#2" className="space-between"/>
          <Key note="C#2" />
          <Key note="D#2" className="space-between"/>
          <Key note="F#2" />          
        </div>
        <div id="keyboard-row">
          <Key note="C1" />
          <Key note="D2" />
          <Key note="E1" />
          <Key note="F1" />
          <Key note="G1" />
          <Key note="A2" />
          <Key note="B2" />
          <Key note="C2" />
          <Key note="D2" />
          <Key note="E2" />
          <Key note="F2" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  recording: state.audioWrapper.recording,
  instrument: state.audioWrapper.instrument
});

const mapDispatchToProps = (dispatch) => {
  return {
    recordNote: (instrument, detune) => {
      dispatch(recordNote(instrument, detune))
    },
    startPlaying: (instrument, detune, note) => {
      dispatch(startPlaying(instrument, detune, note))
    },
    stopPlaying: (instrument, detune, note) => {
      dispatch(stopPlaying(instrument, detune, note))
    },
    stopRecordingNote: (instrument, detune) => {
      dispatch(stopRecordingNote(instrument, detune))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BassSynth);

import './index.css'
import React from 'react';
import { connect } from 'react-redux';
import Key from './key';
import { startPlaying, stopPlaying, recordNote, stopRecordingNote } from '../audio-wrapper/actions';
import convertFromKeycode from '../../utilities/convertFromKeycode';
import convertToDetune from '../../utilities/convertToDetune';


class Keyboard extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", (event) => this.onKeyDown(event))  

    document.addEventListener("keyup", (event) => this.onKeyUp(event))
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", (event) => this.onKeyDown(event))
    document.removeEventListener("keyup", (event) => this.onKeyUp(event))
  }

  onKeyDown(event) {
    console.log(event)
    console.log(event.key)
    let note = convertFromKeycode(event.key, this.props.instrument)
    if (note) {
      if (this.props.recording) {
        this.props.recordNote(this.props.instrument, convertToDetune(note))
      }
      this.props.startPlaying(this.props.instrument, convertToDetune(note), note)
    }
  }

  onKeyUp(event) {
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

      <div id="keyboard" >
        <div id="keyboard-row">
          <Key note="C#3" />
          <Key note="D#3" />
          <Key note="F#3" />
          <Key note="G#3" />
        </div>
        <div id="keyboard-row">
          <Key note="C3" />
          <Key note="D3" />
          <Key note="E3" />
          <Key note="F3" />
          <Key note="G3" />
        </div>
        <div id="keyboard-row">
          <Key note="A#4" />
          <Key note="C#4" />
          <Key note="D#4" />
          <Key note="F#4" />
        </div>
        <div id="keyboard-row">
          <Key note="A4" />
          <Key note="B4" />
          <Key note="C4" />
          <Key note="D4" />
          <Key note="E4" />
          <Key note="F4" />
          <Key note="G4" />
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
)(Keyboard);

import './index.css'
import React from 'react';
import { connect } from 'react-redux';
import Key from './key';
import { startPlaying, stopPlaying, recordNote, stopRecordingNote } from '../audio-wrapper/actions';
import convertFromKeycode from '../../utilities/convertFromKeycode';
import convertToDetune from '../../utilities/convertToDetune';


class Keyboard extends React.Component {
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

      <div id="keyboard" >
        <div id="keyboard-row">
          <Key note="C#3" />
          <Key note="D#3" className="space-between"/>
          <Key note="F#3" />
          <Key note="G#3" />
          <Key note="A#3" className="space-between"/>
          <Key note="C#4" />
          <Key note="D#4" />
        </div>
        <div id="keyboard-row">
          <Key note="C3" />
          <Key note="D3" />
          <Key note="E3" />
          <Key note="F3" />
          <Key note="G3" />
          <Key note="A3" />
          <Key note="B3" />
          <Key note="C4" />
          <Key note="D4" />
          <Key note="E4" />
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

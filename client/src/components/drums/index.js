import React from 'react';
import { connect } from 'react-redux';
import Key from '../keyboard/key';
import convertFromKeycode from '../../utilities/convertFromKeycode';
import convertToDetune from '../../utilities/convertToDetune';
import { startPlaying, stopPlaying, recordNote, stopRecordingNote } from '../audio-wrapper/actions';

export class Drums extends React.Component{
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

  render(){
    return ( 
      <div id="keyboard" >
        <div id="keyboard-row">
          <Key note="hihat1" />          
          <Key note="hihat2" /> 
          <Key note="ride1" /> 
          <Key note="ride2" /> 
          <Key note="snareroll" /> 
          <Key note="ridecrash" /> 
          <Key note="ridebell" /> 
        </div>
        <div id="keyboard-row">          
          <Key note="kick" />
          <Key note="snare1" /> 
          <Key note="snare2" /> 
          <Key note="lowtom1" /> 
          <Key note="lowtom2" />          
          <Key note="hitom1" /> 
          <Key note="hitom2" /> 
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  room: state.socketWrapper.room,
  recording: state.audioWrapper.recording,
  instrument: state.audioWrapper.instrument
})

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
)(Drums);

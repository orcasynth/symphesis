import React from 'react';
import { connect } from 'react-redux';
import Key from '../keyboard/key';
import convertFromKeycode from '../../utilities/convertFromKeycode';
import convertToDetune from '../../utilities/convertToDetune';
import { startPlaying, stopPlaying, recordNote, stopRecordingNote } from '../audio-wrapper/actions';

export class Drums extends React.Component{
  componentDidMount() {
    document.addEventListener("keydown", (event) => this.onKeyDown(event))  

    document.addEventListener("keyup", (event) => this.onKeyUp(event))
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", (event) => this.onKeyDown(event))
    document.removeEventListener("keyup", (event) => this.onKeyUp(event))
  }

  onKeyDown(event) {
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

  render(){
    return ( 
      <div id="keyboard" >
        <div id="keyboard-row">
          <Key note="hihat2" /> 
          <Key note="hihat1" /> 
          <Key note="hitom1" /> 
          <Key note="hitom2" /> 
        </div>
        <div id="keyboard-row">
          <Key note="kick" />
          <Key note="lowtom1" /> 
          <Key note="lowtom2" /> 
          <Key note="ride1" /> 
          <Key note="ride2" /> 
        </div>
        <div id="keyboard-row">
          <Key note="ridebell" /> 
          <Key note="ridecrash" /> 
          <Key note="snare1" /> 
          <Key note="snare2" /> 
        </div>
        <div id="keyboard-row">
          <Key note="snareroll" /> 
          {/*<Key note="B" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="C" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="D" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="E" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="F" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/>  
          <Key note="G" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> */}
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  room: state.socketWrapper.room,
  recording: state.audioWrapper.recording
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

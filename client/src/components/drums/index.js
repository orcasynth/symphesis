import React from 'react';
import { connect } from 'react-redux';
import { Key } from '../keyboard/key';
import {startPlaying, stopPlaying, recordNote, stopRecordingNote} from '../audio-wrapper/actions';

export class Drums extends React.Component{
  // onMouseDown(detune) {
  //   if (this.props.recording) {
  //     this.props.dispatch(recordNote('drums', detune))
  //   }
  //   this.props.dispatch(startPlaying('drums', detune))
  // }

  // onMouseUp(detune) {
  //   if (this.props.recording) {
  //     this.props.dispatch(stopRecordingNote('drums', detune))
  //   }
  //   this.props.dispatch(stopPlaying('drums', detune))
  // }

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

export default connect(mapStateToProps)(Drums);

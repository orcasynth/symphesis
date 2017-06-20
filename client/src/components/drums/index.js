import React from 'react';
import { connect } from 'react-redux';
import { Key } from '../keyboard/key';
import {startPlaying, stopPlaying, recordNote, stopRecordingNote} from '../audio-wrapper/actions';

export class Drums extends React.Component{
  onMouseDown(detune) {
    if (this.props.recording) {
      //change this note to detune
      this.props.dispatch(recordNote('drums', detune))
    }
    //change second note to detune
    this.props.dispatch(startPlaying('drums', detune))
  }

  onMouseUp(detune) {
    if (this.props.recording) {
      //change this note to detune
      this.props.dispatch(stopRecordingNote('drums', detune))
    }
    //turn second note into detune
    this.props.dispatch(stopPlaying('drums', detune))
  }

  render(){
    return( 
      
      <div id="keyboard" >
        <div id="keyboard-row">
          <Key note="pearlkit-hihat.wav" onMouseDown={() => this.onMouseDown("pearlkit-hihat.wav")} onMouseUp={() => this.onMouseUp("pearlkit-hihat.wav")}/> 
          <Key note="pearlkit-hihatO.wav" onMouseDown={() => this.onMouseDown("pearlkit-hihatO.wav")} onMouseUp={() => this.onMouseUp("pearlkit-hihatO.wav")}/> 
          <Key note="pearlkit-hitom1.wav" onMouseDown={() => this.onMouseDown("pearlkit-hitom1.wav")} onMouseUp={() => this.onMouseUp("pearlkit-hitom1.wav")}/> 
          <Key note="pearlkit-hitom2.wav" onMouseDown={() => this.onMouseDown("pearlkit-hitom2.wav")} onMouseUp={() => this.onMouseUp("pearlkit-hitom2.wav")}/> 
        </div>
        <div id="keyboard-row">
          {/*<Key note="A" octave="2" />
          <Key note="A#" octave="2" />
          <Key note="B" octave="2" />*/}
          <Key note="pearlkit-kick.wav" onMouseDown={() => this.onMouseDown("pearlkit-kick.wav")} onMouseUp={() => this.onMouseUp("pearlkit-kick.wav")}/>
          <Key note="pearlkit-lowtom1.wav" onMouseDown={() => this.onMouseDown("pearlkit-lowtom1.wav")} onMouseUp={() => this.onMouseUp("pearlkit-lowtom1.wav")}/> 
          <Key note="pearlkit-lowtom2.wav" onMouseDown={() => this.onMouseDown("pearlkit-lowtom2.wav")} onMouseUp={() => this.onMouseUp("pearlkit-lowtom2.wav")}/> 
          <Key note="pearlkit-ride1.wav" onMouseDown={() => this.onMouseDown("pearlkit-ride1.wav")} onMouseUp={() => this.onMouseUp("pearlkit-ride1.wav")}/> 
          <Key note="pearlkit-ride2.wav" onMouseDown={() => this.onMouseDown("pearlkit-ride2.wav" )} onMouseUp={() => this.onMouseUp("pearlkit-ride2.wav")}/> 
        </div>
        <div id="keyboard-row">
          <Key note="pearlkit-ridebell.wav" onMouseDown={() => this.onMouseDown("pearlkit-ridebell.wav")} onMouseUp={() => this.onMouseUp("pearlkit-ridebell.wav")}/> 
          <Key note="pearlkit-ridecrash.wav" onMouseDown={() => this.onMouseDown("pearlkit-ridecrash.wav")} onMouseUp={() => this.onMouseUp("pearlkit-ridecrash.wav")}/> 
          <Key note="pearlkit-snare1.wav" onMouseDown={() => this.onMouseDown("pearlkit-snare1.wav")} onMouseUp={() => this.onMouseUp("pearlkit-snare1.wav")}/> 
          <Key note="pearlkit-snare2.wav" onMouseDown={() => this.onMouseDown("pearlkit-snare2.wav")} onMouseUp={() => this.onMouseUp("pearlkit-snare2.wav")}/> 
        </div>
        <div id="keyboard-row">
          <Key note="pearlkit-snareroll.wav" onMouseDown={() => this.onMouseDown("pearlkit-snareroll.wav")} onMouseUp={() => this.onMouseUp("pearlkit-snareroll.wav")}/> 
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

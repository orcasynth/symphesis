import React from 'react';
import { connect } from 'react-redux';
import { Key } from '../keyboard/key';
import {startPlaying, stopPlaying, recordNote, stopRecordingNote} from '../audio-wrapper/actions';

export class ElectricGuitar extends React.Component{
  // onMouseDown(detune) {
  //   if (this.props.recording) {
  //     this.props.dispatch(recordNote('electric-guitar', detune))
  //   }
  //   this.props.dispatch(startPlaying('electric-guitar', detune))
  // }

  // onMouseUp(detune) {
  //   if (this.props.recording) {
  //     this.props.dispatch(stopRecordingNote('electric-guitar', detune))
  //   }
  //   this.props.dispatch(stopPlaying('electric-guitar', detune))
  // }

  render(){
    return( 
      
      <div id="keyboard" >
        <div id="keyboard-row">
          <Key note="A"/> 
          <Key note="A7"/> 
          <Key note="Am"/> 
          <Key note="B"/> 
        </div>
        <div id="keyboard-row">
          {/*<Key note="A" octave="2" />
          <Key note="A#" octave="2" />
          <Key note="B" octave="2" />*/}
          <Key note="B7"/>
          <Key note="Bm"/> 
          <Key note="C"/> 
          <Key note="C7"/> 
          <Key note="Cm"/> 
        </div>
        <div id="keyboard-row">
          <Key note="D"/> 
          <Key note="D7"/> 
          <Key note="Dm"/> 
          <Key note="E"/> 
        </div>
        <div id="keyboard-row">
          <Key note="E7"/> 
          <Key note="Em"/> 
          <Key note="F"/> 
          <Key note="F7"/> 
          <Key note="Fm"/> 
          <Key note="G"/>  
          <Key note="G7"/> 
          <Key note="Gm"/> 
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  room: state.socketWrapper.room,
  recording: state.audioWrapper.recording
})

export default connect(mapStateToProps)(ElectricGuitar);

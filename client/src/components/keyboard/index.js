import './index.css'
import React from 'react';
import { connect } from 'react-redux';
import { Key } from './key';
import {startPlaying, stopPlaying, recordNote, stopRecordingNote} from '../audio-wrapper/actions';

export class Keyboard extends React.Component{
  onMouseDown(note) {
    if (this.props.recording) {
      //change this note to detune
      this.props.dispatch(recordNote('keyboard', note))
    }
    //change second note to detune
    this.props.dispatch(startPlaying('keyboard', note, note))
  }

  onMouseUp(note) {
    if (this.props.recording) {
      //change this note to detune
      this.props.dispatch(stopRecordingNote('keyboard', note))
    }
    //turn second note into detune
    this.props.dispatch(stopPlaying('keyboard', note, note))
  }

  render(){
    return( 
      
      <div id="keyboard" >
        <div id="keyboard-row">
          <Key note="C#" octave="3" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="D#" octave="3" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="F#" octave="3" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="G#" octave="3" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
        </div>
        <div id="keyboard-row">
          {/*<Key note="A" octave="2" />
          <Key note="A#" octave="2" />
          <Key note="B" octave="2" />*/}
          <Key note="C" octave="3" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/>
          <Key note="D" octave="3" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="E" octave="3" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="F" octave="3" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="G" octave="3" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
        </div>
        <div id="keyboard-row">
          <Key note="A#" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="C#" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="D#" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="F#" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
        </div>
        <div id="keyboard-row">
          <Key note="A" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="B" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="C" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="D" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="E" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
          <Key note="F" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/>  
          <Key note="G" octave="4" onMouseDown={(note) => this.onMouseDown(note)} onMouseUp={(note) => this.onMouseUp(note)}/> 
        </div>
  
          {/*<li id="C3" title="C3" data-note-type="white" className="white" onMouseDown={(e) => this.playKeyboard(e, 3, 'C3')} onMouseUp={(e) => this.stopKeyboard(e, 3, 'C3')} onKeyDown={(e) => this.handleKeyPress}></li>
          <li id="C#3" title="C#3" data-note-type="black" className="black two" onMouseDown={(e) => this.playKeyboard(e, 4, 'C3')} onMouseUp={(e) => this.stopKeyboard(e, 4, 'C3')}></li>*/}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  room: state.socketWrapper.room,
  recording: state.audioWrapper.recording
})

export default connect(mapStateToProps)(Keyboard);

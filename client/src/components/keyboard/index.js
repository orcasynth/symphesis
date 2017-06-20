import './index.css'
import React from 'react';
import { connect } from 'react-redux';
import { Key } from './key';
import {startPlaying, stopPlaying, recordNote, stopRecordingNote} from '../metronome/actions';

export class Keyboard extends React.Component{
  playKeyboard (e, detune, note) {
    e.stopPropagation()
    if (this.props.recording) {
      this.props.dispatch(recordNote('keyboard', detune*100))
    }
    this.props.dispatch(startPlaying('keyboard', detune*100, note))
  }

  onMouseDown(note) {
  }

  onMouseUp() {
  }

  stopKeyboard (e, detune, note) {
    e.stopPropagation()
    if (this.props.recording) {
      this.props.dispatch(stopRecordingNote('keyboard', detune*100))
    }
    this.props.dispatch(stopPlaying('keyboard', detune*100, note))
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
  recording: state.metronome.recording
})

export default connect(mapStateToProps)(Keyboard);

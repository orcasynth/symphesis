import './index.css'
import React from 'react';
import { connect } from 'react-redux';
import { playKeyboard, stopKeyboard } from './actions';
import { Key } from './key';

export class Keyboard extends React.Component{
  playKeyboard (e, detune, note) {
    e.stopPropagation()
    this.props.dispatch(playKeyboard(detune*100, note))
}

// how do we do this the react way?
// how do we simplify?

  stopKeyboard (e, detune, note) {
    e.stopPropagation()
    this.props.dispatch(stopKeyboard(detune*100, note))
  }

  render(){
    return( 
      
      <div id="keyboard" >
        <div id="keyboard-row">
          <Key note="C#" octave="3" /> 
          <Key note="D#" octave="3" /> 
          <Key note="F#" octave="3" /> 
          <Key note="D#" octave="3" /> 
          <Key note="F#" octave="3" /> 
          <Key note="G#" octave="3" /> 
        </div>
        <div id="keyboard-row">
          {/*<Key note="A" octave="2" />
          <Key note="A#" octave="2" />
          <Key note="B" octave="2" />*/}
          <Key note="C" octave="3" />
          <Key note="D" octave="3" /> 
          <Key note="E" octave="3" /> 
          <Key note="F" octave="3" /> 
          <Key note="G" octave="3" /> 
          <Key note="D" octave="3" /> 
          <Key note="E" octave="3" /> 
          <Key note="F" octave="3" /> 
          <Key note="G" octave="3" />
        </div>
        <div id="keyboard-row">
          <Key note="A#" octave="4" /> 
          <Key note="C#" octave="4" /> 
          <Key note="D#" octave="4" /> 
          <Key note="F#" octave="4" /> 
        </div>
        <div id="keyboard-row">
          <Key note="A" octave="4" /> 
          <Key note="B" octave="4" /> 
          <Key note="C" octave="4" /> 
          <Key note="D" octave="4" /> 
          <Key note="E" octave="4" /> 
          <Key note="F" octave="4" />      
          <Key note="G" octave="4" /> 
        </div>
  
          {/*<li id="C3" title="C3" data-note-type="white" className="white" onMouseDown={(e) => this.playKeyboard(e, 3, 'C3')} onMouseUp={(e) => this.stopKeyboard(e, 3, 'C3')} onKeyDown={(e) => this.handleKeyPress}></li>
          <li id="C#3" title="C#3" data-note-type="black" className="black two" onMouseDown={(e) => this.playKeyboard(e, 4, 'C3')} onMouseUp={(e) => this.stopKeyboard(e, 4, 'C3')}></li>*/}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  room: state.socketWrapper.room,
})

export default connect(mapStateToProps)(Keyboard);

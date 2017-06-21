import React from 'react';
import { connect } from 'react-redux';
import { Key } from '../keyboard/key';
import {startPlaying, stopPlaying, recordNote, stopRecordingNote} from '../audio-wrapper/actions';

export class ElectricGuitar extends React.Component{
  onMouseDown(detune) {
    if (this.props.recording) {
      //change this note to detune
      this.props.dispatch(recordNote('electric-guitar', detune))
    }
    //change second note to detune
    this.props.dispatch(startPlaying('electric-guitar', detune))
  }

  onMouseUp(detune) {
    if (this.props.recording) {
      //change this note to detune
      this.props.dispatch(stopRecordingNote('electric-guitar', detune))
    }
    //turn second note into detune
    this.props.dispatch(stopPlaying('electric-guitar', detune))
  }

  render(){
    return( 
      
      <div id="keyboard" >
        <div id="keyboard-row">
          <Key note="C#" octave="3" onMouseDown={() => this.onMouseDown("cleanchord-A.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-A.mp3")}/> 
          <Key note="D#" octave="3" onMouseDown={() => this.onMouseDown("cleanchord-A7.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-A7.mp3")}/> 
          <Key note="F#" octave="3" onMouseDown={() => this.onMouseDown("cleanchord-Am.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-Am.mp3")}/> 
          <Key note="G#" octave="3" onMouseDown={() => this.onMouseDown("cleanchord-B.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-B.mp3")}/> 
        </div>
        <div id="keyboard-row">
          {/*<Key note="A" octave="2" />
          <Key note="A#" octave="2" />
          <Key note="B" octave="2" />*/}
          <Key note="C" octave="3" onMouseDown={() => this.onMouseDown("cleanchord-B7.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-B7.mp3")}/>
          <Key note="D" octave="3" onMouseDown={() => this.onMouseDown("cleanchord-Bm.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-Bm.mp3")}/> 
          <Key note="E" octave="3" onMouseDown={() => this.onMouseDown("cleanchord-C.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-C.mp3")}/> 
          <Key note="F" octave="3" onMouseDown={() => this.onMouseDown("cleanchord-C7.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-C7.mp3")}/> 
          <Key note="G" octave="3" onMouseDown={() => this.onMouseDown("cleanchord-Cm.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-Cm.mp3")}/> 
        </div>
        <div id="keyboard-row">
          <Key note="A#" octave="4" onMouseDown={() => this.onMouseDown("cleanchord-D.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-D.mp3")}/> 
          <Key note="C#" octave="4" onMouseDown={() => this.onMouseDown("cleanchord-D7.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-D7.mp3")}/> 
          <Key note="D#" octave="4" onMouseDown={() => this.onMouseDown("cleanchord-Dm.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-Dm.mp3")}/> 
          <Key note="F#" octave="4" onMouseDown={() => this.onMouseDown("cleanchord-E.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-E.mp3")}/> 
        </div>
        <div id="keyboard-row">
          <Key note="A" octave="4" onMouseDown={() => this.onMouseDown("cleanchord-E7.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-E7.mp3")}/> 
          <Key note="B" octave="4" onMouseDown={() => this.onMouseDown("cleanchord-Em.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-Em.mp3")}/> 
          <Key note="C" octave="4" onMouseDown={() => this.onMouseDown("cleanchord-F.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-F.mp3")}/> 
          <Key note="D" octave="4" onMouseDown={() => this.onMouseDown("cleanchord-F7.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-F7.mp3")}/> 
          <Key note="E" octave="4" onMouseDown={() => this.onMouseDown("cleanchord-Fm.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-Fm.mp3")}/> 
          <Key note="F" octave="4" onMouseDown={() => this.onMouseDown("cleanchord-G.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-G.mp3")}/>  
          <Key note="G" octave="4" onMouseDown={() => this.onMouseDown("cleanchord-G7.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-G7.mp3")}/> 
          <Key note="G" octave="4" onMouseDown={() => this.onMouseDown("cleanchord-Gm.mp3")} onMouseUp={() => this.onMouseUp("cleanchord-Gm.mp3")}/> 
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

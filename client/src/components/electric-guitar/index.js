import React from 'react';
import { connect } from 'react-redux';
import Key from '../keyboard/key';
import convertFromKeycode from '../../utilities/convertFromKeycode';
import convertToDetune from '../../utilities/convertToDetune';
import { startPlaying, stopPlaying, recordNote, stopRecordingNote } from '../audio-wrapper/actions';

export class ElectricGuitar extends React.Component{
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
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
)(ElectricGuitar);

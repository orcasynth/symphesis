import React from 'react';
import { connect } from 'react-redux';
import Key from '../keyboard/key';
import convertFromKeycode from '../../utilities/convertFromKeycode';
import convertToDetune from '../../utilities/convertToDetune';
import { startPlaying, stopPlaying, recordNote, stopRecordingNote } from '../audio-wrapper/actions';
import './index.css'

export class ElectricGuitar extends React.Component{
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
    return( 
      
      <div id="keyboard" className="eGuitar">
        <div id="keyboard-row" className="row-btn">
          <Key note="G"/>  
          <Key note="A"/> 
          <Key note="B"/> 
          <Key note="C"/> 
          <Key note="D"/> 
          <Key note="E"/> 
          <Key note="F"/>           
        </div>
        <div id="keyboard-row" className="row-btn">
          <Key note="G7"/>           
          <Key note="A7"/> 
          <Key note="B7"/>     
          <Key note="C7"/> 
          <Key note="D7"/> 
          <Key note="E7"/> 
          <Key note="F7"/>           
        </div>
        <div id="keyboard-row" className="row-btn">
          <Key note="Gm"/>         
          <Key note="Am"/> 
          <Key note="Bm"/> 
          <Key note="Cm"/> 
          <Key note="Dm"/> 
          <Key note="Em"/> 
          <Key note="Fm"/> 
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

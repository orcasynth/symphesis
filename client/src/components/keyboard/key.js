import React from 'react';
import { connect } from 'react-redux';
import {startPlaying, stopPlaying, recordNote, stopRecordingNote} from '../audio-wrapper/actions';
import convertToDetune from '../../utilities/convertToDetune';
import convertNoteToKey from '../../utilities/convertNoteToKey';

const KeyPrototype = function(props) {
  function onMouseDown(note) {
    if (props.recording) {
      props.recordNote(props.instrument, convertToDetune(note))
    }
      props.startPlaying(props.instrument, convertToDetune(note), note)
  }  

  function onMouseUp(note) {
    if (props.recording) {
      props.stopRecordingNote(props.instrument, convertToDetune(note))
    }
      props.stopPlaying(props.instrument, convertToDetune(note), note)
  }

  if(props.note.split("").includes("#")){
    return (
      <div
        id={props.note} 
        title={props.note} 
        data-note-type="black" 
        className="black key" 
        onMouseDown={() => onMouseDown(`${props.note}`)} 
        onMouseUp={() => onMouseUp(`${props.note}`)}
      > 
        <p>  <span className="qwerty-key">{convertNoteToKey(props.note, props.instrument)}</span>{props.note} </p>
      </div>
    )
  }
  return(
    <div 
      id={props.note} 
      title={props.note} 
      data-note-type="white" 
      className="white key" 
      onMouseDown={() => onMouseDown(`${props.note}`)} 
      onMouseUp={() => onMouseUp(`${props.note}`)}
      > 
        <p> <span className="qwerty-key">{convertNoteToKey(props.note, props.instrument)}</span>{props.note} </p> 
      </div>
  )
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

const Key = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyPrototype);

export default Key;
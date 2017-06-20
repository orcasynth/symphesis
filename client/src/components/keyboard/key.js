// connect and dispatch
// mapDispatchToProps
// needs to take a prop to identify the key
import React from 'react';
import { connect } from 'react-redux';

export function Key(props) {
  if(props.note.split("").includes("#") || props.note.split("").includes("b")){
    return <li 
        id={props.note + props.octave} 
        title={props.note + props.octave} 
        data-note-type="black" 
        className="black key" 
        onMouseDown={() => props.onMouseDown(`${props.note}${props.octave}`)} 
        onMouseUp={() => props.onMouseUp(`${props.note}${props.octave}`)}
        > 
          {props.note + props.octave} 
        </li>
  }
  return(
    <li 
      id={props.note + props.octave} 
      title={props.note + props.octave} 
      data-note-type="white" 
      className="white key" 
      onMouseDown={() => props.onMouseDown(`${props.note}${props.octave}`)} 
      onMouseUp={() => props.onMouseUp(`${props.note}${props.octave}`)}
      > 
        {props.note + props.octave} 
      </li>
  )
  // empty div in keyboard with onKeyDown inside of keyboard
  // onKeyDown={() => console.log(props.note)}
  // onClick={() => props.dispatch(playKeyboard())}
  // onClick={dispatch()}
  // onClick={dispatch()}
} 

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(Key);
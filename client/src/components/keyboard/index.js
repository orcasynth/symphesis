import './index.css'
import React from 'react';
import { connect } from 'react-redux';


export class Keyboard extends React.Component{
  render(){
    return( 
      <div id="keyboard" >
        <ul>
          <li id="A2" title="A2" data-note-type="white" className="white"></li>
          <li id="A#2" title="A#2" data-note-type="black" className="black one"></li>
          <li id="B2" title="B2" data-note-type="white" className="white"></li>
          <li id="C3" title="C3" data-note-type="white" className="white"></li>
          <li id="C#3" title="C#3" data-note-type="black" className="black two"></li>
          <li id="D3" title="D3" data-note-type="white" className="white"></li>
          <li id="D#3" title="D#3" data-note-type="black" className="black three"></li>
          <li id="E3" title="E3" data-note-type="white" className="white"></li>
          <li id="F3" title="F3" data-note-type="white" className="white"></li>
          <li id="F#3" title="F#3" data-note-type="black" className="black four"></li>
          <li id="G3" title="G3" data-note-type="white" className="white"></li>
          <li id="G#3" title="G#3" data-note-type="black" className="black five"></li>
          <li id="A4" title="A4" data-note-type="white" className="white"></li>
          <li id="A#4" title="A#4" data-note-type="black" className="black six"></li>
          <li id="B4" title="B4" data-note-type="white" className="white"></li>
          <li id="C4" title="C4" data-note-type="white" className="white"></li>
          <li id="C#4" title="C#4" data-note-type="black" className="black seven"></li>
          <li id="D4" title="D4" data-note-type="white" className="white"></li>
          <li id="D#4" title="D#4" data-note-type="black" className="black eight"></li>
          <li id="E4" title="E4" data-note-type="white" className="white"></li>
          <li id="F4" title="F4" data-note-type="white" className="white"></li>
          <li id="F#4" title="F#4" data-note-type="black" className="black nine"></li>
          <li id="G4" title="G4" data-note-type="white" className="white"></li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  room: state.socketWrapper.room,
})

export default connect(mapStateToProps)(Keyboard);

import React from 'react'
import { connect } from 'react-redux'
import { setIsPlaying, setNotPlaying, sendRecording, requestToRecord, mute, trashRecording, changeInstrument } from './actions';
import './index.css'
import Keyboard from '../keyboard';
import Drums from '../drums';
import ElectricGuitar from '../electric-guitar';
import BassSynth from '../bass-synth'
import Mic from '../mic';
import MiscSounds from '../misc-sounds';
class AudioWrapper extends React.Component {
  componentDidMount () {
    this.play();
  }

  componentWillUnmount() {
    this.stop();
  }

  play() {
    this.props.dispatch(setIsPlaying(this.props.bpm, this.props.timeSignature))
  }

  stop() {
    this.props.dispatch(setNotPlaying())
  }

  sendRecording () {
    this.props.dispatch(sendRecording(this.props.room))
  }

  mute (user) {
    let newObj = {...this.props.muted};
    newObj[user] = !newObj[user];
    this.props.dispatch(mute(newObj));
  }

  render() {
    let roommates = [];
    Object.keys(this.props.roommates).forEach((user) => {
      if (this.props.roommates[user].displayName) {
        let muteButtonText = (this.props.muted[user]) ? 
          "Unmute" : 
          "Mute";
        let thatsYou = (this.props.displayName === this.props.roommates[user].displayName) ? 
          "(ME)" :
          null;
        let youColor = (this.props.displayName === this.props.roommates[user].displayName) ? 
          "you-color" :
          null;
        roommates.push(
          <li className={youColor} key={user}><i className="fa fa-user fa-lg" aria-hidden="true"></i> {this.props.roommates[user].displayName} {thatsYou}
            <div className="mute-person" onClick={() => this.mute(user)}> <i className="fa fa-pause-circle fa-lg" aria-hidden="true"></i> {muteButtonText}</div>
          </li>
        )
      }
    })

    let recordingMessage
    if(this.props.recordingMessage === "To Record, Press "){
      recordingMessage = <i className="fa fa-dot-circle-o fa-1x" aria-hidden="true" ></i>
    }

    let trashMessage, trashIcon, sendMessage, sendIcon
    if (this.props.enableSendRecording) {
      trashMessage = " ・ To Trash, Press ";
      trashIcon = <i className="fa fa-times-circle-o fa-1x" aria-hidden="true" ></i> 
      sendMessage = " ・ To Send, Press "
      sendIcon = <i className="fa fa-arrow-circle-o-up fa-1x" aria-hidden="true" ></i> 
    }
    let sendRecording = (this.props.enableSendRecording) ? 
      (<div title="send recording" className="send-button" onClick={() => this.sendRecording()}><i className="fa fa-arrow-circle-o-up fa-3x" aria-hidden="true" ></i></div>) :
      null;

    let instrument;
    switch (this.props.instrument) {
      case "keyboard": 
        instrument = <Keyboard />;
        break;
      case "drums": 
        instrument = <Drums />;
        break;
      case "electric-guitar":
        instrument = <ElectricGuitar />;
        break;
      case "mic":
        instrument = <Mic />;
        break;
      case "bass-synth":
        instrument = <BassSynth />;
        break;
      case "misc-sounds":
        instrument = <MiscSounds />;
        break;
      default:
        instrument = undefined;
    }
    let metronome = (this.props.metronomeRed) ? 
      <div className="metronome metronome-red"> </div> : 
      <div className="metronome"> </div>
    return (
      <main className="main">
        {metronome}
        <div className="transport">        
          {/*<div className="play-button" onClick={() => this.play()}> <i className="fa fa-play-circle fa-3x" aria-hidden="true"></i> </div>
          <div className="stop-button" onClick={() => this.stop()}> <i className="fa fa-stop-circle fa-3x" aria-hidden="true"></i> </div>*/}
          <div alt="record button" title="record button" className="plus-button" onClick={() => this.props.dispatch(requestToRecord())}><i className="fa fa-dot-circle-o fa-3x" aria-hidden="true" ></i></div>
          <div alt="cancel recording button" title="cancel recording "className="minus-button" onClick={() => this.props.dispatch(trashRecording())}><i className="fa fa-times-circle-o fa-3x" aria-hidden="true" ></i></div>
          {sendRecording}
          
        </div>
        <div className="instrument-container">
          <select className="instrument-select" onChange={(e) => {
            this.props.dispatch(changeInstrument(e.target.value))
          }}>
            <option value="electric-guitar"> 🎸 Electric Guitar</option>
            <option value="keyboard">🎹 Keyboard</option>
            <option value="drums">🥁 Drums</option>
            <option value="mic">🎤 Mic</option>
            <option value="bass-synth">🎹 Bass Synth</option>
            <option value="misc-sounds">❓Misc</option>
          </select> 

          {instrument}

          <p className="status-msg">{this.props.recordingMessage}{recordingMessage}{trashMessage}{trashIcon}{sendMessage}{sendIcon}</p>
        </div>
        <div className="users">       
          <p>Roommates</p>
          <ul className="roommates-list">{roommates}</ul>   
        </div>     
      </main>
    )
  }
}

const mapStateToProps = function (state, props) {
  return {
    metronomeRed: state.audioWrapper.metronomeRed,
    isPlaying: state.audioWrapper.isPlaying,
    bpm: state.audioWrapper.bpm,
    timeSignature: state.audioWrapper.timeSignature,
    room: state.socketWrapper.room,
    displayName: state.socketWrapper.displayName,
    roommates: state.audioWrapper.roommates,
    recording: state.audioWrapper.recording,
    recordingMessage: state.audioWrapper.recordingMessage,
    enableSendRecording: state.audioWrapper.enableSendRecording,
    muted: state.audioWrapper.muted,
    instrument: state.audioWrapper.instrument
  }
}

export default connect(mapStateToProps)(AudioWrapper)

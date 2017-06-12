import React from 'react'
import { connect } from 'react-redux'
import { setIsPlaying, setBPM, setNextTickTime, setCurrentSubdivision } from './actions'
import './index.css'

export class Metronome extends React.Component {
    constructor(props) {
        super(props)
        this.Metronome = this.Metronome.bind(this)
    }
    componentWillMount() {
        this.audioContext = new AudioContext()
        let timerID = 0
    }

    //function that updates currentSubdivision and the next tick.
    nextTick() {
        var secondsPerBeat = 60 / this.props.bpm;
        this.props.dispatch(setNextTickTime(
            this.props.nextTickTime+1/this.props.timeSignature * secondsPerBeat
        ))
        this.props.dispatch(setCurrentSubdivision(
            this.props.currentSubdivision+1
        ))
        if (this.props.currentSubdivision > 16) {
            this.props.dispatch(setCurrentSubdivision(1))
        }
    }
    //write a function that starts time via audioContext.
    scheduler() {
        while(this.props.nextTickTime < this.audioContext.currentTime + 0.1 ) {
        /*keep track of subdivisions and next tick*/
        this.nextTick();
        /*schedule sound at the next subdivision.*/
        this.scheduleNote(this.props.currentSubdivision, this.props.nextTickTime);
        }
        this.timerID = window.setTimeout(this.scheduler(), 50.0);
    }

    //write a function that plays a note at a specific time.
    scheduleNote(beatDivisionNumber, time) {
            let osc = this.audioContext.createOscillator();
            let amp= this.audioContext.createGain();
            osc.connect(amp);
            amp.connect(this.audioContext.destination);
            
            amp.gain.value=.05;
            osc.frequency.value = 208;
            
            if(this.props.currentSubdivision%16 === 0) {
            amp.gain.value=.6;
                osc.frequency.value = 224;

            }else if(this.props.currentSubdivision%4 === 0){
            amp.gain.value=.2;
            osc.frequency.value = 216;
            }
            osc.start(time);
            osc.stop(time + 0.1);
            console.log(this.props.currentSubdivision);
    }

    play() {
        console.log(this);
        this.props.dispatch(setIsPlaying())

        if(this.props.isPlaying){
            this.props.dispatch(setCurrentSubdivision(1))//reset the current tick time.
            this.props.dispatch(setNextTickTime(this.audioContext.currentTime))
            this.scheduler();
            return "stop"; 
        } else {
            window.clearTimeout(this.timerID);
            return "play";
        }
        
    }
    render() {
        return (
            <div className="play-button" onClick={this.play} > > </div>
        )
    }    
}

const mapStateToProps = function(state, props) {
    return {
        isPlaying: state.metronome.isPlaying,
        bpm: state.metronome.bpm,
        timeSignature: state.metronome.timeSignature,
        currentSubdivision: state.metronome.currentSubdivision,
        nextTickTime: state.metronome.nextTickTime,
        timerID: state.metronome.timerID
    }
}

export default connect(mapStateToProps)(Metronome)

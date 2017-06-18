import * as actions from '../components/metronome/actions'
import * as keyboardActions from '../components/keyboard/actions'

export const createTimeclockMiddleware = store => {
  let audiocontext
  let currentSubdivision = 1;
  let tickLength;
  let secondsPerBeat;
  let oscillators = [];

  function playMetronomeTone(time, velocity) {
    let osc = audiocontext.createOscillator();
    let amp = audiocontext.createGain();
    osc.connect(amp);
    amp.connect(audiocontext.destination);

    amp.gain.value = velocity;
    osc.frequency.value = 208;
    
    osc.start(time);
    osc.stop(time + 0.1);

  }

  function playNote(detune) {
    var osc = audiocontext.createOscillator();
    var amp=audiocontext.createGain();
    osc.connect(amp);
    amp.connect(audiocontext.destination);

    osc.type = 'sawtooth';
    
    amp.gain.value=.5;
    amp.gain.setTargetAtTime(0.5, audiocontext.currentTime, 0.01)
    osc.frequency.value = 440;
    osc.detune.value = detune;
    
    osc.start(audiocontext.currentTime);
    let pushItem = {oscillator: osc, detune}
    oscillators.push(pushItem)
  }

  function stopNote(detune) {
    let index;
    oscillators.forEach((obj, i) => {
      if (obj.detune === detune) {
        obj.oscillator.stop(0)
        index = i
      }
    })
    oscillators.splice(index, 1)
  }

  return next => action => {
    // console.log('From middleware: ', action)
    if (action.type === actions.SET_IS_PLAYING && !audiocontext) {
      audiocontext = new AudioContext();
      currentSubdivision = 1;
      secondsPerBeat = 60 / action.bpm;
      tickLength = 1 / action.timeSignature *  60 / action.bpm;
      actions.interval = setInterval(() => store.dispatch({ type: actions.SET_NEXT_TICK_TIME, bpm: action.bpm, timeSignature: action.timeSignature}), tickLength * 1000)
    } else if (action.type === actions.SET_NOT_PLAYING && audiocontext) {
      clearInterval(actions.interval);
      audiocontext.close().then(function () {
        audiocontext = undefined;
        console.log('Audiocontext has closed.')
      });
    } else if (action.type === actions.SET_NEXT_TICK_TIME) {
      action.nextTickTime = audiocontext.currentTime + tickLength;
      action.currentTime = audiocontext.currentTime;
      if (currentSubdivision === 16) {
        currentSubdivision = 1
      } else {
        currentSubdivision++;
        if (currentSubdivision === 2) {
          playMetronomeTone(action.nextTickTime, .6)
        } else if (currentSubdivision%action.timeSignature === 2){
          playMetronomeTone(action.nextTickTime, .2)
        }  
      }
      action.currentSubdivision = currentSubdivision
    }
    else if (action.type === keyboardActions.PLAY_KEYBOARD) {
      playNote(action.detune.detune)
    }
    else if (action.type === keyboardActions.STOP_KEYBOARD) {
      console.log('stopaction', action)
      stopNote(action.detune.detune)
    }
    return next(action);
  }

}
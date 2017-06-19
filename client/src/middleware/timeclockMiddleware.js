import * as actions from '../components/metronome/actions'

export const createTimeclockMiddleware = store => {
  let audiocontext
  let currentSubdivision = 1;
  let tickLength;
  let secondsPerBeat;
  let oscillators = [];
  let recording = [];
  let recordingStartTime;

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

  function playNote(instrument, detune) {
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

  function stopNote(instrument, detune) {
    let index = oscillators.findIndex((oscillator) => {
      return oscillator.detune === detune;
    })
    oscillators[index].oscillator.stop(0);
    oscillators.splice(index, 1)
  }

  function recordNote (instrument, detune) {
    if (recording.length > 0) {
      recordingStartTime = audiocontext.currentTime;
    }
    oscillators.push({instrument, startTime: audiocontext.currentTime-recordingStartTime, detune, stopTime: undefined})
  }
  
  function stopRecordingNote (instrument, detune) {
    for (let i = 0; i < recording.length; i++) {
      if (recording[i].detune === detune) {
        if (!recording[i].stopTime) {
          recording[i].stopTime = audiocontext.currentTime-recordingStartTime;
          break;
        }
      }
    }
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
    else if (action.type === actions.START_PLAYING) {
      playNote(action.instrument, action.detune)
    }
    else if (action.type === actions.STOP_PLAYING) {
      stopNote(action.instrument, action.detune)
    }
    else if (action.type === actions.RECORD_NOTE) {
      recordNote(action.instrument, action.detune)
    }
    else if (action.type === actions.STOP_RECORDING_NOTE) {
      stopRecordingNote(action.instrument, action.detune)
    }
    return next(action);
  }

}
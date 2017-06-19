import * as actions from '../components/metronome/actions'

export const createTimeclockMiddleware = store => {
  let audiocontext
  let currentSubdivision = 1;
  let tickLength;
  let secondsPerBeat;
  let timeSignature;
  let oscillators = [];
  let recording = [];
  let recordingInterval = 2;
  let recordingStartTime;
  let roommates;
  let interval = {};

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

  function playNote(instrument, detune, start, stop) {
    console.log(detune)
    let osc = audiocontext.createOscillator();
    let amp = audiocontext.createGain();
    osc.connect(amp);
    amp.connect(audiocontext.destination);
    if (instrument === "keyboard") {
      osc.type = 'sawtooth';

      amp.gain.value = .5;
      amp.gain.setTargetAtTime(0.5, audiocontext.currentTime, 0.01)
      osc.frequency.value = 440;
      osc.detune.value = detune;
    }

    start ? osc.start(start) : osc.start(audiocontext.currentTime)
    if (stop) {
      osc.stop(stop);
    }
    let pushItem = { oscillator: osc, detune }
    oscillators.push(pushItem)
  }

  function stopNote(instrument, detune) {
    let index = oscillators.findIndex((oscillator) => {
      return oscillator.detune === detune;
    })
    oscillators[index].oscillator.stop(0);
    oscillators.splice(index, 1)
  }

  function recordNote(instrument, detune) {
    if (recording.length === 0) {
      recordingStartTime = audiocontext.currentTime;
    }
    if (audiocontext.currentTime - recordingStartTime < (recordingInterval * secondsPerBeat * timeSignature)) {
      recording.push({ instrument, startTime: audiocontext.currentTime - recordingStartTime, detune, stopTime: undefined });
    }
  }

  function stopRecordingNote(instrument, detune) {
    for (let i = 0; i < recording.length; i++) {
      if (recording[i].detune === detune) {
        if (!recording[i].stopTime) {
          let stopTime = audiocontext.currentTime - recordingStartTime
          recording[i].stopTime = (stopTime < (2 * secondsPerBeat * timeSignature)) ? stopTime : (recordingInterval * secondsPerBeat * timeSignature);
          break;
        }
      }
    }
  }

  return next => action => {
    if (action.type === actions.SET_IS_PLAYING && !audiocontext) {
      audiocontext = new AudioContext();
      currentSubdivision = 1;
      timeSignature = action.timeSignature;
      secondsPerBeat = 60 / action.bpm;
      tickLength = 1 / action.timeSignature * 60 / action.bpm;
      interval = setInterval(() => store.dispatch({ type: actions.SET_NEXT_TICK_TIME, bpm: action.bpm, timeSignature: action.timeSignature }), tickLength * 1000);
    }
    else if (action.type === actions.SET_NOT_PLAYING && audiocontext) {
      clearInterval(interval);
      interval = {};
      audiocontext.close().then(function () {
        audiocontext = undefined;
        console.log('Audiocontext has closed.')
      });
    }
    else if (action.type === actions.SET_NEXT_TICK_TIME) {
      action.nextTickTime = audiocontext.currentTime + tickLength;
      action.currentTime = audiocontext.currentTime;
      if (currentSubdivision === timeSignature * recordingInterval * 4) {
        currentSubdivision = 1;
        recording.forEach((note) => playNote(note.instrument, note.detune, note.startTime + action.nextTickTime, note.stopTime + action.nextTickTime))
        for (let user in roommates) {
          let roommateRecording = roommates[user].recording;
          if (roommateRecording) {
            roommateRecording.forEach((note) => playNote(note.instrument, note.detune, note.startTime + action.nextTickTime, note.stopTime + action.nextTickTime))
          }
        }
      }
      else {
        currentSubdivision++;
        if (currentSubdivision === 2) {
          playMetronomeTone(action.nextTickTime, .6);
        }
        else if (currentSubdivision % action.timeSignature === 2) {
          playMetronomeTone(action.nextTickTime, .2);
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
    else if (action.type === actions.START_RECORDING) {
      recording = [];
      setTimeout(() => store.dispatch({type: actions.STOP_RECORDING}), (recordingInterval * secondsPerBeat * timeSignature)*1000)
    }
    else if (action.type === actions.STOP_RECORDING) {
    }
    else if (action.type === actions.RECEIVE_RECORDING) {
      roommates = action.roommates;
    }
    else if (action.type === actions.SEND_RECORDING) {
      action.recording = [...recording];
      recording = [];
    }
    return next(action);
  }

}
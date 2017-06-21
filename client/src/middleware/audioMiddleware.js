import * as actions from '../components/audio-wrapper/actions'

export const audioMiddleware = store => {
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
  let interval;
  let nextTickTime;

  //helper functions
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

  //used to play notes both with and without pre-defined stopping times
  function playNote(instrument, detune, start, stop) {
    switch (instrument) {
      case "keyboard":
        playKeyboard(detune, start, stop);
        break;
      default:
        playSamples(instrument, detune, start, stop);
        break;
    }
  }

  function playKeyboard(detune, start, stop) {
    let osc = audiocontext.createOscillator();
    let amp = audiocontext.createGain();
    osc.connect(amp);
    amp.connect(audiocontext.destination);

    osc.type = 'sawtooth';

    amp.gain.value = .5;
    amp.gain.setTargetAtTime(0.5, audiocontext.currentTime, 0.01)
    osc.frequency.value = 440;
    osc.detune.value = detune;
    start ?
      osc.start(start) :
      osc.start(audiocontext.currentTime)
    if (stop) {
      osc.stop(stop);
    }
    let pushItem = { oscillator: osc, detune }
    oscillators.push(pushItem)
  }

  function stopNote(instrument, detune) {
    console.log(oscillators)
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
    //check to make sure starttime doesn't go over permitted length
    if (audiocontext.currentTime - recordingStartTime < (recordingInterval * secondsPerBeat * timeSignature)) {
      recording.push({ instrument, startTime: audiocontext.currentTime - recordingStartTime, detune, stopTime: undefined });
    }
  }

  function stopRecordingNote(instrument, detune) {
    for (let i = 0; i < recording.length; i++) {
      if (recording[i].detune === detune) {
        if (!recording[i].stopTime) {
          let stopTime = audiocontext.currentTime - recordingStartTime;
          //check to make sure stoptime doesn't go over permitted length
          recording[i].stopTime = (stopTime < (2 * secondsPerBeat * timeSignature)) ?
            stopTime :
            (recordingInterval * secondsPerBeat * timeSignature);
          break;
        }
      }
    }
  }

  function playSamples(instrument, detune, start, stop) {
    getSample(`samples/${instrument}/${detune}`, function play(buffer) {
      let player = audiocontext.createBufferSource()
      player.buffer = buffer
      player.connect(audiocontext.destination)
      start ?
        player.start(start) :
        player.start(audiocontext.currentTime);
      if (stop) {
        player.stop(stop);
      }
      let pushItem = { oscillator: player, detune }
      oscillators.push(pushItem)
    })
  }

  function getSample(url, cb) {
    var request = new XMLHttpRequest()
    request.open('GET', url)
    request.responseType = 'arraybuffer'
    request.onload = function () {
      audiocontext.decodeAudioData(request.response, cb)
    }
    request.send()
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
      interval = undefined;
      audiocontext.close().then(function () {
        audiocontext = undefined;
        console.log('Audiocontext has closed.')
      });
    }
    else if (action.type === actions.SET_NEXT_TICK_TIME) {
      nextTickTime = audiocontext.currentTime + tickLength;
      if (currentSubdivision === timeSignature * recordingInterval * 4) {
        currentSubdivision = 1;
      }
      else {
        currentSubdivision++;
        //subdivision 2 is treated as the "first" beat of the measure
        if (currentSubdivision === 2) {
          recording.forEach((note) => playNote(note.instrument, note.detune, note.startTime + nextTickTime, note.stopTime + nextTickTime));
          Object.keys(roommates).forEach((user) => {
            let roommateRecording = roommates[user].recording;
            if (roommateRecording) {
              console.log(roommateRecording)
              roommateRecording.forEach((note) => playNote(note.instrument, note.detune, note.startTime + nextTickTime, note.stopTime + nextTickTime))
            }
          })
        }
        if (currentSubdivision === 2 || currentSubdivision === (2 + (4 * timeSignature))) {
          playMetronomeTone(nextTickTime, .6);
          // playKick();
        }
        else if (currentSubdivision % action.timeSignature === 2) {
          playMetronomeTone(nextTickTime, .2);
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
      setTimeout(() => store.dispatch({ type: actions.STOP_RECORDING }), (recordingInterval * secondsPerBeat * timeSignature) * 1000)
    }
    else if (action.type === actions.STOP_RECORDING) {
      store.dispatch({ type: actions.ENABLE_SEND_RECORDING, enableSendRecording: true })
      store.dispatch({ type: actions.UPDATE_RECORDING_MESSAGE, recordingMessage: "Not recording" })
    }
    else if (action.type === actions.RECEIVE_RECORDING) {
      roommates = action.roommates;
    }
    else if (action.type === actions.SEND_RECORDING) {
      if (recording.length > 0) {
        action.recording = [...recording];
        recording = [];
      }
      store.dispatch({ type: actions.ENABLE_SEND_RECORDING, enableSendRecording: false })
    }
    else if (action.type === actions.REQUEST_START_RECORDING) {
      // let threeTicksInSeconds = 3/tickLength;
      let totalSubdivisions = 4 * timeSignature * recordingInterval;
      // let pointOfNoReturn = totalSubdivisions + 2 - threeTicksInSeconds;

      //wherever 1 is below, that is used instead of 2 because we don't count the next tick - function may be called mid-tick
      let ticksUntilNextLoop = currentSubdivision < 2 ?
        (1 - currentSubdivision) :
        (totalSubdivisions + 1 - currentSubdivision);
      let timeUntilNextLoop = ticksUntilNextLoop * tickLength + nextTickTime - audiocontext.currentTime;
      let timeUntilRecordInMS = (timeUntilNextLoop > 3) ?
        timeUntilNextLoop * 1000 :
        (timeUntilNextLoop + (totalSubdivisions * tickLength)) * 1000;
      store.dispatch({ type: actions.UPDATE_RECORDING_MESSAGE, recordingMessage: "You're set to record once we get to the start of the loop..." });
      setTimeout(() => store.dispatch({ type: actions.UPDATE_RECORDING_MESSAGE, recordingMessage: 'Recording in 3...' }), timeUntilRecordInMS - 3000);
      setTimeout(() => store.dispatch({ type: actions.UPDATE_RECORDING_MESSAGE, recordingMessage: 'Recording in 2...' }), timeUntilRecordInMS - 2000);
      setTimeout(() => store.dispatch({ type: actions.UPDATE_RECORDING_MESSAGE, recordingMessage: 'Recording in 1...' }), timeUntilRecordInMS - 1000);
      setTimeout(() => store.dispatch({ type: actions.UPDATE_RECORDING_MESSAGE, recordingMessage: "You're recording!" }), timeUntilRecordInMS);
      setTimeout(() => store.dispatch({ type: actions.START_RECORDING }), timeUntilRecordInMS);
    }
    else if (action.type === actions.UPDATE_RECORDING_MESSAGE) {

    }
    return next(action);
  }

}
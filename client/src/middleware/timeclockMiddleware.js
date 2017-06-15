import * as actions from '../components/metronome/actions'
export const createTimeclockMiddleware = store => {
  let audiocontext
  let currentSubdivision = 1;
  let tickLength;
  let secondsPerBeat;
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
      }
      action.currentSubdivision = currentSubdivision
    }
    return next(action);
  }

}
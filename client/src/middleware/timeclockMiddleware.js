import * as actions from '../components/metronome/actions'
export const createTimeclockMiddleware = store => {
  let audiocontext

  return next => action => {
    console.log('From middleware: ', action)
    if (action.type === actions.SET_IS_PLAYING && !audiocontext) {
      audiocontext = new AudioContext();
      actions.interval = setInterval(() => store.dispatch({ type: 'SET_TICK', currentTime: audiocontext.currentTime }), 1000)
    } else if (action.type === actions.SET_NOT_PLAYING && audiocontext) {
      clearInterval(actions.interval);
      audiocontext.close().then(function () {
        audiocontext = undefined;
        console.log('Audiocontext has closed.')
      });
    } else if (action.type === actions.SET_NEXT_TICK_TIME) {
      console.log(action)
      let secondsperbeat = 60 / action.bpm;
    }
    return next(action);
  }

}
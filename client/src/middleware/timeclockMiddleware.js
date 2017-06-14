import * as actions from '../components/metronome/actions'
export const createTimeclockMiddleware = store => {
    let audiocontext
    
    return next => action => {
        console.log('From middleware: ',action)
        if (action.type === actions.SET_IS_PLAYING) {
            audiocontext = new AudioContext();
            actions.interval = setInterval(() => store.dispatch({ type:'SET_TICK', currentTime: audiocontext.currentTime}), 1000)
        } else if (action.type === actions.SET_NOT_PLAYING) {
            clearInterval(actions.interval);
        }
        return next(action);
    }
    
}
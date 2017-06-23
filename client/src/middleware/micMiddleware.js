import * as actions from '../components/mic/actions'
import * as audioWrapperActions from '../components/audio-wrapper/actions';

//pass store and actions to middleware.
export const micMiddleware = store => {

  let mediaRecorder;
  let chunks;

  function initializeMic() {
    navigator.getUserMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );
    if (navigator.getUserMedia) {
      let constraints = { audio: true };
      let onError = function (err) {
        console.log('The following error occured: ' + err);
      }

      navigator.getUserMedia(constraints, onSuccess, onError);
    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  }


  function onSuccess(stream) {
    mediaRecorder = new MediaRecorder(stream);
    chunks = [];

    mediaRecorder.start();

    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    }

    mediaRecorder.onstop = function (e) {
      let blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
      chunks = [];
      let fd = new FormData();
      let room = store.getState().socketWrapper.room;
      let yourDisplayName = store.getState().socketWrapper.displayName;
      fd.append('mic', blob, `${room}_${yourDisplayName}.ogg` );

      fetch('/api/audioupload',
      {
        method: 'post',
        body: fd
      })
      .then((res => res.json()))
      .then((res) => {
        if (res) {
          store.dispatch({type: audioWrapperActions.SEND_RECORDING, room: res})
        }
      })

    }
  }
  return next => action => {
    switch (action.type) {
      case actions.START_MIC_RECORDING:
        initializeMic();
        
        store.dispatch(actions.setRecordButtonDisabled(true));
        store.dispatch(actions.setStopButtonDisabled(false));
        break;
      case actions.STOP_MIC_RECORDING:
        mediaRecorder.stop();
        store.dispatch(actions.setRecordButtonDisabled(false));
        store.dispatch(actions.setStopButtonDisabled(true));
        break;
      default:
        break;
    }
    return next(action);
  }





} //end micMiddleware


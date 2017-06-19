import { SET_IS_PLAYING, SET_NOT_PLAYING, RECEIVE_RECORDING, START_RECORDING, STOP_RECORDING, UPDATE_RECORDING_MESSAGE } from "./actions"

const initialState = {
    isPlaying: false,
    bpm: 60,
    timeSignature: 4,
    recording: false,
    recordingMessage: 'Not recording'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_PLAYING:
            return {
                ...state,
                isPlaying: true
            }
        case SET_NOT_PLAYING:
            return {
                ...state,
                isPlaying: false
            }
        case START_RECORDING:
            return {
                ...state,
                recording: true
            }
        case STOP_RECORDING: 
            return {
                ...state,
                recording: false
            }
        case RECEIVE_RECORDING: 
            return {
                ...state,
                roommates: action.roommates
            }
        case UPDATE_RECORDING_MESSAGE:
            return {
                ...state,
                recordingMessage: action.recordingMessage
            }
        default:
            return state;
    }
}
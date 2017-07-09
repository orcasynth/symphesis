import { SET_IS_PLAYING, SET_NOT_PLAYING, RECEIVE_RECORDING, START_RECORDING, STOP_RECORDING, UPDATE_RECORDING_MESSAGE, ENABLE_SEND_RECORDING, MUTE, CHANGE_INSTRUMENT, FLASH_METRONOME_RED, FLASH_METRONOME_WHITE } from "./actions"

const initialState = {
    metronomeRed: false,
    isPlaying: false,
    bpm: 78,
    timeSignature: 4,
    //IS "RECORDING" BEING USED BY REACT?
    recording: false,
    recordingMessage: 'Press + To Record.',
    enableSendRecording: false,
    roommates: false,
    muted: {},
    instrument: "electric-guitar",
    keyTracker: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FLASH_METRONOME_RED:
            return {
                ...state,
                metronomeRed: true
            }
        case FLASH_METRONOME_WHITE:
            return {
                ...state,
                metronomeRed: false
            }
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
        case ENABLE_SEND_RECORDING: 
            return {
                ...state,
                enableSendRecording: action.enableSendRecording
            }
        case MUTE:
            return {
                ...state,
                muted: action.obj
            }
        case CHANGE_INSTRUMENT:
            return {
                ...state,
                instrument: action.instrument
            }
        default:
            return state;
    }
}
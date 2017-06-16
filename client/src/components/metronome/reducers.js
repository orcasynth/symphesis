import { SET_IS_PLAYING, SET_NOT_PLAYING, SET_NEXT_TICK_TIME, SEND_RECORDING, RECEIVE_RECORDING } from "./actions"

const initialState = {
    isPlaying: false,
    bpm: 60,
    timeSignature: 4,
    currentSubdivision: 1,
    nextTickTime: 0,
    currentTime: 0,
    timerID: null,
    recording: null
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
        case SET_NEXT_TICK_TIME:
            return {
                ...state,
                nextTickTime: action.nextTickTime,
                currentSubdivision: action.currentSubdivision,
                currentTime: action.currentTime
            }
        case RECEIVE_RECORDING: 
            return {
                ...state,
                roommates: action.roommates
            }
        default:
            return state;
    }
}
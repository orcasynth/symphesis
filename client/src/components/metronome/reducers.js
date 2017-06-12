import {SET_IS_PLAYING, SET_BPM, SET_NEXT_TICK_TIME, SET_CURRENT_SUBDIVISION} from "./actions"

const initialState = {
    isPlaying: false,
    bpm:120,
    timeSignature:4,
    currentSubdivision:1,
    nextTickTime: 0,
    timerID:null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_PLAYING: 
            return [
                ...state,
                {
                    isPlaying: !initialState.isPlaying
                }
            ] 
        case SET_BPM: 
            return [
                ...state,
                {
                    bpm: action.bpm
                }
            ]
        case SET_NEXT_TICK_TIME:
            return [
                ...state,
                {
                    nextTickTime: action.nextTickTime
                }
            ]
        case SET_CURRENT_SUBDIVISION:
            return [
                ...state,
                {
                    currentSubdivision: action.currentSubdivision
                }
            ]
        default: 
            return state;
    }
}
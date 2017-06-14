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
            let newPlayState = !state.isPlaying
            return {
                ...state,
                    isPlaying: newPlayState
            }
        case SET_BPM: 
            return {
                ...state,
                    bpm: action.bpm
            }
        case SET_NEXT_TICK_TIME:
            let newTickTime = state.nextTickTime + action.nextTickTime
            return {
                ...state,
                    nextTickTime: newTickTime
            }
        case SET_CURRENT_SUBDIVISION:
            let newCurrentSubdivision = state.currentSubdivision + action.currentSubdivision
            console.log('newCurrentSubdivision: ', newCurrentSubdivision)
            console.log('action.currentSubdivision: ', action.currentSubdivision)
            return {
                ...state,
                    currentSubdivision: newCurrentSubdivision
            }
        default: 
            return state;
    }
}
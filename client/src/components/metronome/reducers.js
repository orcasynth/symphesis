import { SET_IS_PLAYING, SET_NOT_PLAYING, SET_TICK, SET_BPM, SET_NEXT_TICK_TIME, SET_CURRENT_SUBDIVISION } from "./actions"

const initialState = {
    isPlaying: false,
    bpm: 60,
    timeSignature: 4,
    currentSubdivision: 1,
    nextTickTime: 0,
    currentTime: 0,
    timerID: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_PLAYING:
            let newIsState = true
            return {
                ...state,
                isPlaying: newIsState
            }
        case SET_NOT_PLAYING:
            let notPlaying = false
            return {
                ...state,
                isPlaying: notPlaying
            }
        case SET_TICK:
            console.log(action)
            return {
                ...state,
                currentTime: Math.floor(action.currentTime)
            }
        case SET_BPM:
            return {
                ...state,
                bpm: action.bpm
            }
        case SET_NEXT_TICK_TIME:
            return {
                ...state,
                nextTickTime: action.nextTickTime,
                currentSubdivision: action.currentSubdivision,
                currentTime: action.currentTime
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
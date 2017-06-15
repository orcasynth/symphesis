export const SET_IS_PLAYING = "SET_IS_PLAYING"
export const setIsPlaying = (bpm, timeSignature) => ({
    type: SET_IS_PLAYING,
    bpm, 
    timeSignature, 
})
export const SET_NOT_PLAYING = "SET_NOT_PLAYING"
export const setNotPlaying = () => ({
    type: SET_NOT_PLAYING,
})

export const SET_NEXT_TICK_TIME = "SET_NEXT_TICK_TIME"
export const setNextTickTime = (bpm, timeSignature) => ({
    type: SET_NEXT_TICK_TIME,
    bpm,
    timeSignature,
})

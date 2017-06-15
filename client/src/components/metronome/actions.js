export const SET_IS_PLAYING = "SET_IS_PLAYING"
export const setIsPlaying = () => ({
    type: SET_IS_PLAYING,
})
export const SET_NOT_PLAYING = "SET_NOT_PLAYING"
export const setNotPlaying = () => ({
    type: SET_NOT_PLAYING,
})

export const SET_TICK = "SET_TICK"
export const setTick = time => ({
    type: SET_TICK,
    time
})

export const SET_BPM = "SET_BPM"
export const setBPM = bpm => ({
    type: SET_BPM,
    bpm
})

export const SET_NEXT_TICK_TIME = "SET_NEXT_TICK_TIME"
export const setNextTickTime = (nextTickTime, bpm, timeSignature) => ({
    type: SET_NEXT_TICK_TIME,
    nextTickTime,
    bpm,
    timeSignature
})

export const SET_CURRENT_SUBDIVISION = "SET_CURRENT_SUBDIVISION"
export const setCurrentSubdivision = int => ({
    type: SET_CURRENT_SUBDIVISION,
    currentSubdivision: int
})
export const SET_IS_PLAYING = "SET_IS_PLAYING"
export const setIsPlaying = () => ({
    type: SET_IS_PLAYING,
})

export const SET_BPM = "SET_BPM"
export const setBPM = bpm => ({
    type: SET_BPM,
    bpm
})

export const SET_NEXT_TICK_TIME = "SET_NEXT_TICK_TIME"
export const setNextTickTime = int => ({
    type: SET_NEXT_TICK_TIME,
    nextTickTime: int
})

export const SET_CURRENT_SUBDIVISION = "SET_CURRENT_SUBDIVISION"
export const setCurrentSubdivision = int => ({
    type: SET_CURRENT_SUBDIVISION,
    currentSubdivision: int
})
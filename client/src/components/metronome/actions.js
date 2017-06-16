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

export const SEND_RECORDING = "SEND_RECORDING";
export const sendRecording = (recording, room) => ({
    type: SEND_RECORDING,
    recording,
    room,
})

export const RECEIVE_RECORDING = "RECEIVE_RECORDING";
export const receiveRecording = (roommates) => ({
    type: RECEIVE_RECORDING,
    roommates
})
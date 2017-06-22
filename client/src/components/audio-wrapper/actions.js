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

export const RECORD_NOTE = "RECORD_NOTE"
export const recordNote = (instrument, detune) => ({
    type: RECORD_NOTE,
    detune,
    instrument,
})

export const STOP_RECORDING_NOTE = "STOP_RECORDING_NOTE"
export const stopRecordingNote = (instrument, detune) => ({
    type: STOP_RECORDING_NOTE,
    instrument,
    detune
})

export const START_RECORDING = "START_RECORDING"
export const startRecording = () => ({
    type: START_RECORDING
})

export const STOP_RECORDING = "STOP_RECORDING"
export const stopRecording = () => ({
    type: STOP_RECORDING
})

export const START_PLAYING = "START_PLAYING"
export const startPlaying = (instrument, detune, note) => ({
    type: START_PLAYING,
    instrument,
    detune,
    note 
})

export const STOP_PLAYING = "STOP_PLAYING"
export const stopPlaying = (instrument, detune, note) => ({
    type: STOP_PLAYING,
    instrument, 
    detune,
    note
})

export const SEND_RECORDING = "SEND_RECORDING";
export const sendRecording = (room) => ({
    type: SEND_RECORDING,
    room,
})

export const RECEIVE_RECORDING = "RECEIVE_RECORDING";
export const receiveRecording = (roommates) => ({
    type: RECEIVE_RECORDING,
    roommates
})

export const REQUEST_START_RECORDING = "REQUEST_START_RECORDING";
export const requestToRecord = () => ({
    type: REQUEST_START_RECORDING,
})

export const UPDATE_RECORDING_MESSAGE = "UPDATE_RECORDING_MESSAGE";
export const updateRecordingMessage = () => ({
    type: UPDATE_RECORDING_MESSAGE,
})

export const ENABLE_SEND_RECORDING = "ENABLE_SEND_RECORDING";
export const enableSendRecording = (enableSendRecording) => ({
    type: ENABLE_SEND_RECORDING,
    enableSendRecording
})

export const MUTE = "MUTE";
export const mute = (obj) => ({
    type: MUTE,
    obj
})

export const TRASH_RECORDING = "TRASH_RECORDING";
export const trashRecording = () => ({
    type: TRASH_RECORDING
})

export const CHANGE_INSTRUMENT = "CHANGE_INSTRUMENT";
export const changeInstrument = (instrument) => ({
    type: CHANGE_INSTRUMENT,
    instrument
})

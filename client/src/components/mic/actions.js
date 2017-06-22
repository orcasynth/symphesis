export const START_MIC_RECORDING = "START_MIC_RECORDING"
export const setMicIsRecording = (isRecording) => ({
    type: START_MIC_RECORDING,
    isRecording: isRecording,
})
export const STOP_MIC_RECORDING = "STOP_MIC_RECORDING"
export const setMicNotRecording = (isRecording) => ({
    type: STOP_MIC_RECORDING,
    isRecording: isRecording,
})

export const SET_RECORD_BUTTON_DISABLED = "SET_RECORD_BUTTON_DISABLED"
export const setRecordButtonDisabled = (isDisabled) => ({
    type: SET_RECORD_BUTTON_DISABLED,
    recordButtonDisabled: isDisabled,
})


export const SET_STOP_BUTTON_DISABLED = "SET_STOP_BUTTON_DISABLED"
export const setStopButtonDisabled = (isDisabled) => ({
    type: SET_STOP_BUTTON_DISABLED,
    stopButtonDisabled: isDisabled,
})


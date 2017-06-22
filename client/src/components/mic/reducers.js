import { START_MIC_RECORDING, STOP_MIC_RECORDING, SET_RECORD_BUTTON_DISABLED, SET_STOP_BUTTON_DISABLED } from "./actions"


const initialState = {
  isRecording: false,
  recordButtonDisabled: false,
  stopButtonDisabled: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case START_MIC_RECORDING:
      return {
        ...state,
        isRecording: action.isRecording
      }
    case STOP_MIC_RECORDING:
      return {
        ...state,
        isRecording: action.isRecording
      }
    case SET_RECORD_BUTTON_DISABLED:
      return {
        ...state,
        recordButtonDisabled: action.recordButtonDisabled
      }
    case SET_STOP_BUTTON_DISABLED:
      return {
        ...state,
        stopButtonDisabled: action.stopButtonDisabled
      }
    default:
      return state;
  }
}
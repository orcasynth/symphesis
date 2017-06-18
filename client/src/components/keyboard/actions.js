export const PLAY_KEYBOARD = "PLAY_KEYBOARD"
export const playKeyboard = (detune, note) => ({
    type: PLAY_KEYBOARD,
    detune: {detune, note}, 
})

export const STOP_KEYBOARD = "STOP_KEYBOARD"
export const stopKeyboard = (detune, note) => ({
    type: STOP_KEYBOARD,
    detune: {detune, note}, 
})
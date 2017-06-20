export const PLAY_KEYBOARD = "PLAY_KEYBOARD"
export const playKeyboard = (note) => ({
    type: PLAY_KEYBOARD,
    note
})

export const STOP_KEYBOARD = "STOP_KEYBOARD"
export const stopKeyboard = (note) => ({
    type: STOP_KEYBOARD,
    note
})

// export const addNote = ({ value, letter }) => ({
//   type: ADD_NOTE,
//   value,
//   letter,
// });

// export const removeNote = ({ value }) => ({
//   type: REMOVE_NOTE,
//   value,
// });``
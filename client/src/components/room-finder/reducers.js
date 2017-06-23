import {DISPLAY_MODAL} from './actions';

const initialState = {
  displayModal: false
}

export default (state = initialState, action) => {
  if (action.type === DISPLAY_MODAL) {
    return {
      ...state,
      displayModal: !state.displayModal,
    }
  }
  return state;
}

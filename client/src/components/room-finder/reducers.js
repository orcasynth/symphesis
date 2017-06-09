import {GET_AVAILABLE_ROOMS, SET_ROOM} from './actions';

const initialState = {
  availableRooms: false,
  room: false
}

export default (state = initialState, action) => {
  if (action.type === GET_AVAILABLE_ROOMS) {
    return {
      ...state,
      availableRooms: action.availableRooms,
    }
  }
  if (action.type === SET_ROOM) {
    return {
      ...state,
      room: action.room
    }
  }
  return state;
}


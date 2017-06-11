import {GET_AVAILABLE_ROOMS, SET_ROOM, SOCKET_ERROR, LEAVE_ROOM} from './actions';

const initialState = {
  availableRooms: false,
  room: false,
  socketError: false
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
      socketError: false,
      room: action.room
    }
  }
  if (action.type === LEAVE_ROOM) {
    return {
      ...state,
      room: false
    }
  }
  if (action.type === SOCKET_ERROR) {
    return {
      ...state,
      socketError: action.socketError
    }
  }
  return state;
}


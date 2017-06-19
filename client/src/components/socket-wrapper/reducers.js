import {GET_AVAILABLE_ROOMS, SET_ROOM_AND_USER, SOCKET_ERROR, LEAVE_ROOM} from './actions';

const initialState = {
  availableRooms: false,
  room: false,
  displayName: false,
  socketError: false
}

export default (state = initialState, action) => {
  if (action.type === GET_AVAILABLE_ROOMS) {
    return {
      ...state,
      availableRooms: action.availableRooms,
    }
  }
  if (action.type === SET_ROOM_AND_USER) {
    return {
      ...state,
      socketError: false,
      room: action.room,
      displayName: action.displayName
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


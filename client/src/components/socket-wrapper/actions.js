export const GET_AVAILABLE_ROOMS = 'GET_AVAILABLE_ROOMS';
export const getAvailableRooms = (availableRooms) => ({
  type: GET_AVAILABLE_ROOMS,
  availableRooms
});

export const SET_ROOM_AND_USER = 'SET_ROOM_AND_USER';
export const setRoomAndUser = (data) => ({
  type: SET_ROOM_AND_USER,
  room: data.room,
  displayName: data.displayName
});

export const SOCKET_ERROR = 'SOCKET_ERROR';
export const socketError = (socketError) => ({
  type: SOCKET_ERROR,
  socketError
});

export const LEAVE_ROOM = 'LEAVE_ROOM';
export const leaveRoom = (room) => ({
  type: LEAVE_ROOM,
  room
})

export const JOIN_ROOM = 'JOIN_ROOM';
export const joinRoom = (room) => ({
  type: JOIN_ROOM,
  room
})

export const CREATE_ROOM = "CREATE_ROOM";
export const createRoom = () => ({
  type: CREATE_ROOM
})

export const LIST_ROOMS = "LIST_ROOMS";
export const listRooms = () => ({
  type: LIST_ROOMS
})
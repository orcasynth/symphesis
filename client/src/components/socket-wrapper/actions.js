export const GET_AVAILABLE_ROOMS = 'GET_AVAILABLE_ROOMS';
export const getAvailableRooms = (availableRooms) => ({
    type: GET_AVAILABLE_ROOMS,
    availableRooms
});

export const SET_ROOM = 'SET_ROOM';
export const setRoom = (room) => ({
    type: SET_ROOM,
    room
});

export const SOCKET_ERROR = 'SOCKET_ERROR';
export const socketError = (socketError) => ({
    type: SOCKET_ERROR,
    socketError
});

export const LEAVE_ROOM = 'LEAVE_ROOM';
export const leaveRoom = () => ({
    type: LEAVE_ROOM
})
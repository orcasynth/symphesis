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

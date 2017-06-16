import * as actions from '../components/socket-wrapper/actions';
import io from 'socket.io-client';
let socket;

export function storeWrapper(store){
  socket = io()
  socket.on('message', (msg) => console.log(msg));
  socket.on('hasJoined', (room) => store.dispatch(actions.setRoom(room)));
  socket.on('roomError', (error) => store.dispatch(actions.socketError(error)));
  socket.on('listRooms', (rooms) => store.dispatch(actions.getAvailableRooms(rooms))); 
}

export function socketMiddleware(store) {  
  return next => action => {
    // console.log("Middleware triggered:", action);
    const result = next(action);

    if(socket && action.type === actions.LEAVE_ROOM) {
      // console.log('LEAVE_ROOM')
      socket.emit('leaveRoom', { room: action.room })
    }

    if(socket && action.type === actions.JOIN_ROOM) {
      // console.log('JOIN_ROOM', action)
      socket.emit('joinRoom', { room: action.room })
    }

    if(socket && action.type === actions.CREATE_ROOM) {
      // console.log('CREATE_ROOM', action)
      socket.emit('createRoom')
    }

    if(socket && action.type === actions.LIST_ROOMS) {
      // console.log('LIST_ROOMS', action)
      socket.emit('listRooms')
    }

    return result; 
  }
}

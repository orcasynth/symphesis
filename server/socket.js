let Moniker = require('moniker');
let rooms = {};

function socketRooms(io) {
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('listRooms', () => {
      socket.emit('listRooms', returnRoomList(rooms))
    });

    socket.on('createRoom', () => {
      let room = roomGenerator();
      socket.join(room);
      rooms[room] = {};
      let displayName = usernameGenerator(room);
      rooms[room][socket.id] = { recording: null, displayName };
      rooms[room].length = io.sockets.adapter.rooms[room].length;
      socket.emit('hasJoined', {room, displayName});
      io.emit('listRooms', returnRoomList(rooms));
      io.in(room).emit('receiveRecording', rooms[room]);
    });

    socket.on('joinRoom', (data) => {
      if (!io.sockets.adapter.rooms[data.room]) {
        socket.emit('roomError', 'Room does not exist')
      }
      else if (io.sockets.adapter.rooms[data.room].length > 5) {
        socket.emit('roomError', 'Room just filled up')
      }
      else {
        socket.join(data.room);
        let displayName = usernameGenerator(data.room);
        rooms[data.room][socket.id] = { recording: null, displayName };
        rooms[data.room].length = io.sockets.adapter.rooms[data.room].length;
        socket.emit('hasJoined', {room: data.room, displayName});
        io.in(data.room).emit('receiveRecording', rooms[data.room]);
        io.emit('listRooms', returnRoomList(rooms));
      }
    });

    socket.on('leaveRoom', (data) => {
      socket.leave(data.room);
      if (io.sockets.adapter.rooms[data.room]) {
        delete rooms[data.room][socket.id];
        rooms[data.room].length = io.sockets.adapter.rooms[data.room].length;
      }
      else {
        delete rooms[data.room]
      }
      io.emit('listRooms', returnRoomList(rooms));
    })

    socket.on('sendRecording', (data) => {
      rooms[data.room][socket.id].recording = data.recording;
      io.in(data.room).emit('receiveRecording', rooms[data.room]);
    })

    socket.on('disconnect', () => {
      console.log('a user disconnected');
      let userRoom;
      // Object.keys + for each IS MORE DECLARATIVE AND MODERN
      for (let room in rooms) {
        if (io.sockets.adapter.rooms[room]) {
          if (rooms[room][socket.id]) {
            userRoom = room;
            delete rooms[room][socket.id];
          }
        }
        else {
          delete rooms[room];
        }
      }
      io.in(userRoom).emit('receiveRecording', rooms[userRoom])
      io.emit('listRooms', returnRoomList(rooms));
    });

    function roomGenerator() {
      let roomName = Moniker.generator([Moniker.adjective, Moniker.noun]).choose();
      if (io.sockets.adapter.rooms[roomName]) {
        return roomGenerator();
      }
      return roomName;
    }

    function returnRoomList(obj) {
      let returnedObj = {};
      for (let key in obj) {
        returnedObj[key] = obj[key].length;
      }
      return returnedObj;
    }

    function usernameGenerator(room) {
      let foundName = false;
      let userName = Moniker.generator([Moniker.adjective, Moniker.noun]).choose();
      for (let user in rooms[room]) {
        if (rooms[room][user].displayName === userName) {
          foundName = true;
          break;
        }
      }
      if (foundName) {
        return usernameGenerator(room);
      }
      return userName;
    }
  })
}

module.exports = { socketRooms, rooms }
let Moniker = require('moniker');
let rooms = {};

function socketRooms(io) {
  io.on('connection', (socket) => {
    console.log('a user connected');

    // FUTURE IMPLEMENTATION
    socket.on('message', (data) => {
      console.log('message', data);
      io.to(data.room).emit('message', data.message);
    });

    socket.on('listRooms', () => {
      socket.emit('listRooms', rooms)
    });

    socket.on('joinRoom', (data) => {
      // RECONSIDER ROOM MANAGEMENT LATER
      if (!io.sockets.adapter.rooms[data.room]) {
        socket.emit('roomError', 'Room does not exist')
      }
      else if (io.sockets.adapter.rooms[data.room].length > 5) {
        socket.emit('roomError', 'Room just filled up')
        // ADD ALTERATE BUTTON FOR ROOM FOR LISTENERS
      } 
      else {
        socket.join(data.room);
        rooms[data.room] = io.sockets.adapter.rooms[data.room].length;
        socket.emit('hasJoined', data.room);
        io.emit('listRooms', rooms);
      }
    });

    function roomGenerator () {
      let roomName = Moniker.generator([Moniker.adjective, Moniker.noun]).choose();
      if (io.sockets.adapter.rooms[roomName]) {
        return roomGenerator();
      }
      return roomName;
    }

    socket.on('createRoom', () => {
      let room = roomGenerator();
      socket.join(room);
      rooms[room] = io.sockets.adapter.rooms[room].length;
      socket.emit('hasJoined', room);
      io.emit('listRooms', rooms);
    });

    socket.on('leaveRoom', (data) => {
      socket.leave(data.room);
      if (io.sockets.adapter.rooms[data.room]) {
        rooms[data.room] = io.sockets.adapter.rooms[data.room].length;
      }
      else {
        delete rooms[data.room]
      }
      io.emit('listRooms', rooms);
    })

    // FUTURE IMPLEMENTATION
    // socket.on('add music', data => {
    //     io.broadcast.to(data.room).emit('SOMETHING HERE', data)
    // })

    socket.on('disconnect', () => {
      console.log('a user disconnected');
      // Object.keys + for each IS MORE DECLARATIVE AND MODERN
      for (let room in rooms) {
        if (io.sockets.adapter.rooms[room]) {
          if (io.sockets.adapter.rooms[room].length !== rooms[room]) {
            rooms[room] = io.sockets.adapter.rooms[room].length;
          }
        }
        else {
          delete rooms[room];
        }
      }
      io.emit('listRooms', rooms);
    });
  })
}

module.exports = { socketRooms }
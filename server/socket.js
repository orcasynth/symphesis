var Moniker = require('moniker');
let rooms = {};

function socketRooms(io) {
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (data) => {
      console.log('message', data);
      io.to(data.room).emit('message', data.message);
    });

    socket.on('checkRooms', data => {
      socket.emit('checkRooms', rooms)
    });

    socket.on('disconnect', () => {
      console.log('a user disconnected');
      for (let key in rooms) {
        if (io.sockets.adapter.rooms[key]) {
          if (io.sockets.adapter.rooms[key].length !== rooms[key]) {
            rooms[key] = io.sockets.adapter.rooms[key].length;
          }
        }
        else {
          delete rooms[key];
        }
      }
      io.emit('checkRooms', rooms);
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
        rooms[data.room] = io.sockets.adapter.rooms[data.room].length;
        socket.emit('hasJoined', data.room);
        io.emit('checkRooms', rooms);
      }
    });

    socket.on('createRoom', data => {
      var names = Moniker.generator([Moniker.adjective, Moniker.noun]);
      let room = names.choose()
      if (io.sockets.adapter.rooms[room]) {
        socket.emit('roomError', 'Room already exists')
      }
      else {
        socket.join(room);
        rooms[room] = io.sockets.adapter.rooms[room].length;
        socket.emit('hasJoined', room);
        io.emit('checkRooms', rooms);
      }
    });

    socket.on('leave', (data) => {
      socket.leave(data.room);
      if (io.sockets.adapter.rooms[data.room]) {
        rooms[data.room] = io.sockets.adapter.rooms[data.room].length;
      }
      else {
        delete rooms[data.room]
      }
      io.emit('checkRooms', rooms);
    })
    // socket.on('add music', data => {
    //     io.broadcast.to(data.room).emit('SOMETHING HERE', data)
    // })
  })
}

module.exports = { socketRooms }
function socketRooms(io) {
  io.on('connection', (socket) => {
    console.log('a user connected');
    let rooms = {};

    socket.on('message', (data) => {
      console.log('message', data);
      io.to(data.room).emit('message', data.message);
    });

    socket.on('checkRooms', data => {
      socket.emit('checkRooms', rooms)
    });

    socket.on('disconnect', () => {
      console.log('a user disconnected');
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
        socket.emit('hasJoined', data.room)
        console.log('room  ->', data);
        io.emit('checkRooms', rooms);
      }
    });

    socket.on('createRoom', data => {
      if (io.sockets.adapter.rooms[data.room]) {
        socket.emit('roomError', 'Room already exists')
      }
      else {
        socket.join(data.room);
        rooms[data.room] = io.sockets.adapter.rooms[data.room].length;
        socket.emit('hasJoined', data.room);
        io.emit('checkRooms', rooms);
        console.log('rooms', rooms)
        console.log(io.sockets.adapter.rooms)
      }
    });

    socket.on('leave', (data) => {
      console.log('attempted to leave');
            console.log(io.sockets.adapter.rooms)
      socket.leave(data.room);
      if (io.sockets.adapter.rooms[data.room]) {
        rooms[data.room] = io.sockets.adapter.rooms[data.room].length;
      }
      else {
        delete rooms[data.room]
      }
      io.emit('checkRooms', rooms);
      console.log(io.sockets.adapter.rooms)
    })
    // socket.on('add music', data => {
    //     io.broadcast.to(data.room).emit('SOMETHING HERE', data)
    // })
  })
}

module.exports = { socketRooms }
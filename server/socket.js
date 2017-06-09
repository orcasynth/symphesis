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
    socket.on('room', (data) => {
      socket.join(data.room);
      rooms[data.room] = io.sockets.adapter.rooms[data.room].length;
      socket.emit('hasJoined', data.room)
      console.log('room  ->', data);
      io.emit('checkRooms', rooms)
    })
    socket.on('leave', (data) => {
      console.log('attempted to leave');
      socket.leave(data.room);
    })
    // socket.on('add music', data => {
    //     io.broadcast.to(data.room).emit('SOMETHING HERE', data)
    // })
  })
}

module.exports = { socketRooms }
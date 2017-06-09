function socketRooms(io) {
  io.on('connection', (socket) => {
    console.log('a user connected');
    let rooms = {};
    socket.on('message', (data) => {
      console.log('message', data);
      io.to(data.room).emit('message', data.message);
    });
    socket.on('checkroom', data => {
      console.log('hi');
      let clients2 = io.sockets.adapter.rooms;
      let clients = io.nsps['/'].adapter.rooms;
      console.log(clients);
      console.log(clients2);
      console.log(rooms);
      // io.emit('checkroom', clients2)
    });
    socket.on('disconnect', () => {
      console.log('a user disconnected');
    });
    socket.on('room', (data) => {
      console.log('room  ->', data);
      socket.join(data.room);
      if (!rooms[data.room]) {
        rooms[data.room] = 1;
      }
      else if (rooms[data.room]) {
        rooms[data.room]++;
      }
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
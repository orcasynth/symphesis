function socketRooms(io) {
  io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('message', (data) => {
      console.log('message', data)
      io.to(data.room).emit('message', data.message)
    })

    socket.on('test1', (data) => {
      console.log('test1 ->', data)
      socket.join(data.test1)
      console.log('data.test1 ->', data.test1)
    })
    socket.on('disconnect', () => {
      console.log('a user disconnected')
    })
    socket.on('room', (data) => {
      console.log('room  ->', data)
      socket.join(data.room)
      console.log('data.room ->', data.room)
    })
    // socket.on('leave', (data) => {
    //   console.log('attempted to leave')
    //   socket.leave(data.room)
    // })
    // socket.on('add music', data => {
    //     io.broadcast.to(data.room).emit('SOMETHING HERE', data)
    // })
  })
}

module.exports = { socketRooms }
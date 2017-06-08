function socketRooms(io) {
  io.on('connection', (socket) => {
    console.log('aa user connected')

    // socket.on('message', (data) => {
    //   console.log('message', data)
    //   io.to(data.room).emit('message', data.message)
    // })

    socket.on('shit fucker', (data) => {
      console.log('data')
    })
    socket.on('test1', data => {
      console.log(data)
    })
    socket.on('disconnect', () => {
      console.log('a user disconnected')
    })
    socket.on('room', (data) => {
      console.log('hello this is room')
      // console.log(data)
      socket.join(data.room)
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
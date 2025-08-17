import app from './app.js'
import http from 'http'
import { Server } from 'socket.io'
const port = process.env.PORT || 8080
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL || '*' } })

io.on('connection', (socket) => {
  console.log('socket connected', socket.id)
  socket.on('join-room', ({ roomId, userId }) => {
    socket.join(roomId)
    socket.to(roomId).emit('peer-joined', { socketId: socket.id, userId })
  })
  socket.on('signal', ({ roomId, data }) => {
    socket.to(roomId).emit('signal', { from: socket.id, data })
  })
  socket.on('leave-room', ({ roomId }) => {
    socket.leave(roomId)
    socket.to(roomId).emit('peer-left', { socketId: socket.id })
  })
  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id)
  })
})

server.listen(port, ()=> console.log(`API + Socket listening on :${port}`))

import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
export default function useSignaling(roomId, onSignal){ 
  const socketRef = useRef(null)
  useEffect(()=>{
    if(!roomId) return
    const socket = io(process.env.VITE_API_BASE || 'http://localhost:8080')
    socketRef.current = socket
    socket.emit('join-room', { roomId, userId: 'user-' + Math.random().toString(36).slice(2,8) })
    socket.on('signal', ({ from, data })=> onSignal?.(from, data))
    socket.on('peer-joined', d=> console.log('peer joined', d))
    return ()=> { socket.disconnect() }
  },[roomId])
  const send = (data)=> socketRef.current?.emit('signal', { roomId, data })
  return { send }
}

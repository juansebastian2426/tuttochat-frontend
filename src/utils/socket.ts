import io from 'socket.io-client'

const socketServerURL = import.meta.env.VITE_SOCKET_SERVER as string

export const socket = io(socketServerURL)

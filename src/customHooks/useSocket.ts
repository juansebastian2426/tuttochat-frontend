import { useEffect, useState } from 'react'
import { socket } from '../utils/socket'

export const useSocket = () => {
  const [online, setOnline] = useState<boolean>(socket.connected)

  useEffect(() => {
    function onConnect () {
      setOnline(true)
    }

    function onDisconnect () {
      setOnline(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return { online }
}

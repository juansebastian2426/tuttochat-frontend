import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { type Message } from '../entities/Message'
import { socket } from '../utils/socket'
import { UserContext } from './UserContext'

interface ChatState {
  messages: Message[]
  someoneTyping: boolean
  sendMessage: (message: any) => void
  onTyping: (onTyping: boolean) => void
}

const ChatContext = createContext<ChatState | null>(null)

interface Props {
  children: JSX.Element
}
const ChatProvider = ({ children }: Props) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [someoneTyping, setSomeoneTyping] = useState<boolean>(false)
  const userContext = useContext(UserContext)

  const sendMessage = (message: any) => {
    const messageToSend = {
      id: Date.now().toString(),
      message: message.message,
      ISODate: new Date().toISOString(),
      userId: userContext?.user?.userId
    }

    socket.emit('send_message', messageToSend)

    handleSetMessage(messageToSend)
  }

  const onTyping = (onTyping: boolean) => {
    socket.emit('typing_message', { typing: onTyping })
  }

  const handleSetMessage = useCallback((data: any) => {
    setMessages(current => [...current, {
      id: data.id,
      message: data.message,
      time: new Date(data.ISODate),
      userId: data.userId
    }])
  }, [])

  const handleSomeoneTyping = useCallback((data: any) => {
    setSomeoneTyping(data.typing)
  }, [])

  useEffect(() => {
    socket.on('receive_message', handleSetMessage)
    socket.on('typing_message', handleSomeoneTyping)

    socket.emit('get_messages', (response: Message[]) => {
      setMessages(response.map((x: any) => ({
        id: x.id,
        message: x.message,
        time: new Date(x.ISODate),
        userId: x.userId
      })))
    })

    return () => {
      socket.off('receive_message', handleSetMessage)
      socket.off('typing_message', handleSomeoneTyping)
    }
  }, [])

  const values: ChatState = {
    sendMessage,
    messages,
    onTyping,
    someoneTyping
  }

  return (
    <ChatContext.Provider value={values}>
      { children }
    </ChatContext.Provider>
  )
}

export {
  ChatContext,
  ChatProvider
}

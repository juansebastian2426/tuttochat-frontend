import { useContext, useEffect, useRef } from 'react'
import './MessageList.css'
import { MessageItem } from '../MessageItem/MessageItem'
import { ChatContext } from '../../contexts/ChatContext'
import { UserContext } from '../../contexts/UserContext'

export const MessageList = () => {
  const endDivMessage = useRef<HTMLDivElement>(null)
  const chatContext = useContext(ChatContext)
  const userContext = useContext(UserContext)

  const scrollToBottom = () => {
    endDivMessage.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatContext?.messages])

  return (
    <div className="message-list">
      {
        chatContext?.messages.map(item => (
          <MessageItem
            key={item.id}
            date={item.time}
            message={item.message}
            isMe={item.userId === userContext?.user?.userId}/>
        ))
      }
      <div ref={endDivMessage}></div>
    </div>
  )
}

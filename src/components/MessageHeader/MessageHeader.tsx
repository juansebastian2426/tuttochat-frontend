import './MessageHeader.css'
import { useSocket } from '../../customHooks/useSocket'

export const MessageHeader = () => {
  const { online } = useSocket()

  const isOnline = online ?? false

  return (
    <div className='message-header-container'>
      <div className={`message-header__alert ${isOnline ? 'message-header__online' : 'message-header__offline'}`}></div>
      <h1 className='message-header__title'>Anonymous tutto chat</h1>
    </div>
  )
}

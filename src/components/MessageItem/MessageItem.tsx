import './MessageItem.css'

interface Props {
  isMe?: boolean
  message: string
  date: Date
}

export const MessageItem = (props: Props) => {
  const { date, isMe = false } = props

  const minute = ('0' + date.getMinutes()).slice(-2)
  const time = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${date.getHours()}:${minute} `

  return (
    <div className={`message-item-container${isMe ? ' message-item-container--me' : ''}`}>
      <div className={`message-item${isMe ? ' message-item--me' : ''}`}>
        <p className='message-item__text'>{props.message}</p>
        <small className='message-item__time'>{time}</small>
      </div>
    </div>
  )
}

import './MessageInput.css'
import sendIcon from '../../assets/send.png'
import { type KeyboardEvent, type FormEvent, useContext, type ChangeEvent } from 'react'
import { useRef } from 'react'
import { ChatContext } from '../../contexts/ChatContext'

export const MessageInput = () => {
  const chatContext = useContext(ChatContext)
  const inputMessage = useRef<HTMLFormElement>(null)

  const onKeyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === 'Enter') {
      event.preventDefault()
      handlerSendMessage()
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const form = inputMessage.current as HTMLFormElement
    const text = form['input-message'].value

    if (text === '') {
      chatContext?.onTyping(false)
      return
    }

    chatContext?.onTyping(true)
  }

  const onSubmitMessage = (event: FormEvent) => {
    event.preventDefault()
    handlerSendMessage()
  }

  const handlerSendMessage = () => {
    const form = inputMessage.current as HTMLFormElement
    const text = form['input-message'].value

    if (text === '') {
      return false
    }

    chatContext?.sendMessage({
      message: text
    })
    chatContext?.onTyping(false)
    inputMessage.current?.reset()
  }
  const isTyping = chatContext?.someoneTyping ?? false

  return (
    <>
      <form ref={inputMessage} className="message-input-container" onSubmit={onSubmitMessage}>
        {isTyping && <div className='message-input__alert'>Alguien está escribiendo ...</div>}
        <textarea
          name='input-message'
          placeholder='Escribe un mensaje'
          rows={1}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          className='message-input' />
        <button className='message-input__btn-send' type='submit'>
          <img src={sendIcon} width={25} height={25}/>
        </button>
      </form>
    </>
  )
}

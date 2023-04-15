import './App.css'
import { MessageList } from './components/MessageList/MessageList'
import { MessageInput } from './components/MessageInput/MessageInput'
import { MessageHeader } from './components/MessageHeader/MessageHeader'

function App () {
  return (
    <div className='container'>
      <MessageHeader />
      <MessageList />
      <MessageInput />
    </div>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChatProvider } from './contexts/ChatContext'
import { UserProvider } from './contexts/UserContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </UserProvider>
  </React.StrictMode>
)

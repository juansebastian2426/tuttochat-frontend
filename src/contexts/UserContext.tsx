import { createContext, useEffect, useState } from 'react'
import { type User } from '../entities/User'

interface UserState {
  user?: User
}

const UserContext = createContext<UserState | null>(null)

interface Props {
  children: JSX.Element
}
const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    let userId = localStorage.getItem('tuttochat-userId')

    if (userId === null) {
      const id = Date.now().toString()
      localStorage.setItem('tuttochat-userId', id)
      userId = id
    }

    setUser({
      userId
    })
  }, [])

  const values: UserState = {
    user
  }

  return (
    <UserContext.Provider value={values}>
      { children }
    </UserContext.Provider>
  )
}

export {
  UserContext,
  UserProvider
}

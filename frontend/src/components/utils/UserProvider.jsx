import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    fname: "fnameData",
    lname: "lnameData",
    email: "email@data.com",
    username: "usernameData",
    bio: "bioData",
    skills: [],
    interests: [],
    matches: [],
    notification: []
  })

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
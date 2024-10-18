import { createContext, useState, useContext } from "react"

const NavigationContext = createContext()

export const NavigationProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("home")

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => useContext(NavigationContext)

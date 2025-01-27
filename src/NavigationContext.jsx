import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react"

const NavigationContext = createContext(null)

export const NavigationProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("home")
  const [navigationHistory, setNavigationHistory] = useState([])

  // Memoized navigation handler
  const handleNavigation = useCallback((section) => {
    setActiveSection(section)
    setNavigationHistory((prev) => [...prev, section])
  }, [])

  // Memoize context value to prevent unnecessary rerenders
  const contextValue = useMemo(
    () => ({
      activeSection,
      navigationHistory,
      setActiveSection: handleNavigation,
    }),
    [activeSection, navigationHistory, handleNavigation]
  )

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  )
}

// Custom hook with error handling
export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}

// Export a way to reset navigation state if needed
export const useResetNavigation = () => {
  const { setActiveSection } = useNavigation()
  return useCallback(() => setActiveSection("home"), [setActiveSection])
}

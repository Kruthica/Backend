import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

const themes = {
  blue: {
    name: 'Blue',
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  },
  pink: {
    name: 'Pink',
    primary: '#ec4899',
    secondary: '#f472b6',
    accent: '#fbcfe8',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #fbcfe8 100%)',
  },
  black: {
    name: 'Black',
    primary: '#1f2937',
    secondary: '#374151',
    accent: '#4b5563',
    gradient: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)',
  },
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('blue')

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'blue'
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const applyTheme = (themeName) => {
    const selectedTheme = themes[themeName]
    if (!selectedTheme) return

    const root = document.documentElement
    root.style.setProperty('--theme-primary', selectedTheme.primary)
    root.style.setProperty('--theme-secondary', selectedTheme.secondary)
    root.style.setProperty('--theme-accent', selectedTheme.accent)
    root.style.setProperty('--theme-gradient', selectedTheme.gradient)
    root.style.setProperty('--theme-primary-15', hexToRgba(selectedTheme.primary, 0.15))
    root.style.setProperty('--theme-primary-20', hexToRgba(selectedTheme.primary, 0.2))
  }

  const changeTheme = (themeName) => {
    setTheme(themeName)
    localStorage.setItem('theme', themeName)
    applyTheme(themeName)
  }

  return (
    <ThemeContext.Provider value={{ theme, themes, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}


import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import './ThemeSelector.css'

const ThemeSelector = () => {
  const { theme, themes, changeTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="theme-selector">
      <button
        className="theme-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Change theme"
      >
        <span className="theme-icon">🎨</span>
        <span className="theme-label">Theme</span>
      </button>
      
      {isOpen && (
        <>
          <div className="theme-overlay" onClick={() => setIsOpen(false)} />
          <div className="theme-options">
            <div className="theme-options-header">
              <h3>Choose Theme</h3>
              <button className="close-theme" onClick={() => setIsOpen(false)}>×</button>
            </div>
            <div className="theme-buttons">
              <button
                className={`theme-option ${theme === 'blue' ? 'active' : ''}`}
                onClick={() => {
                  changeTheme('blue')
                  setIsOpen(false)
                }}
              >
                <div className="theme-preview blue-theme"></div>
                <span>Blue</span>
              </button>
              <button
                className={`theme-option ${theme === 'pink' ? 'active' : ''}`}
                onClick={() => {
                  changeTheme('pink')
                  setIsOpen(false)
                }}
              >
                <div className="theme-preview pink-theme"></div>
                <span>Pink</span>
              </button>
              <button
                className={`theme-option ${theme === 'black' ? 'active' : ''}`}
                onClick={() => {
                  changeTheme('black')
                  setIsOpen(false)
                }}
              >
                <div className="theme-preview black-theme"></div>
                <span>Black</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ThemeSelector


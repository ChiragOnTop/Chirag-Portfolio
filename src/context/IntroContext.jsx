import { createContext, useContext, useState } from 'react'

const IntroContext = createContext(null)

function getInitialState() {
  if (typeof window === 'undefined') {
    return { introComplete: true, skipIntro: true }
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const skipped = sessionStorage.getItem('intro-skipped') === '1'
  const skip = reduced || skipped
  return { introComplete: skip, skipIntro: skip }
}

export function IntroProvider({ children }) {
  const initial = getInitialState()
  const [introComplete, setIntroComplete] = useState(initial.introComplete)
  const [skipIntro, setSkipIntro] = useState(initial.skipIntro)

  const completeIntro = () => {
    setIntroComplete(true)
    sessionStorage.setItem('intro-skipped', '1')
  }

  return (
    <IntroContext.Provider value={{ introComplete, skipIntro, setSkipIntro, completeIntro }}>
      {children}
    </IntroContext.Provider>
  )
}

export function useIntro() {
  const ctx = useContext(IntroContext)
  if (!ctx) throw new Error('useIntro must be used within IntroProvider')
  return ctx
}

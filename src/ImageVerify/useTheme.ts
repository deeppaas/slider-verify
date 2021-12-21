import React, { Key } from 'react'
import { DEFAULT_THEME } from './constants'
import { ThemeType } from './ImageVerifyType'

function useTheme(theme: ThemeType) {
  React.useEffect(() => {
    if (theme !== 'unset') {
      let newTheme = DEFAULT_THEME
      if (theme !== 'default') {
        newTheme = { ...DEFAULT_THEME, ...theme }
      }
      const keys = Object.keys(newTheme)
      keys.forEach(key => {
        document.documentElement.style.setProperty(
          `--slider-${key}`,
          // @ts-ignore
          newTheme[key]
        )
      })
    }
  }, [theme])
}

export default useTheme

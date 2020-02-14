import { Global } from '@emotion/core'
import React, { ReactNode } from 'react'
import { ThemeProvider } from 'theme-ui'

import theme from './theme'

export default function StoryWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={{
          '*': { boxSizing: 'border-box' },
          a: {
            textDecoration: 'none',
          },
          body: {
            backgroundColor: '#efefef',
            fontFamily: 'Open Sans',
            margin: 0,
            padding: 0,
            color: '#231f20',
          },
          ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
          },
        }}
      />
      {children}
    </ThemeProvider>
  )
}

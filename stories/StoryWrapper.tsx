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
          h2: {
            fontSize: '2rem',
            lineHeight: '2.35rem',
            marginTop: '2.5rem',
          },
          h3: {
            fontSize: '1.5rem',
            lineHeight: '',
            marginTop: '2.1875rem',
            marginBottom: '1.25rem',
          },
          h4: {
            fontSize: '1rem',
            lineHeight: '',
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
          },
          p: {
            fontSize: '1rem',
            lineHeight: '1.5rem',
            marginBottom: '1.5rem',
          },
        }}
      />
      {children}
    </ThemeProvider>
  )
}

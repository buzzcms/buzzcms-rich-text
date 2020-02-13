import * as CSS from 'csstype'
import { ObjectOrArray } from 'styled-system'
import { Theme } from 'theme-ui'

interface CustomTheme extends Theme {
  iconItemLists?: ObjectOrArray<CSS.StandardProperties>
  taxonItems?: ObjectOrArray<CSS.StandardProperties>
  entryCards?: ObjectOrArray<CSS.StandardProperties>
  productCards?: ObjectOrArray<CSS.StandardProperties>
}

const theme: Partial<CustomTheme> = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#2B6CB0',
    secondary: '#609',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        primary: '#07c',
        secondary: '#609',
      },
    },
  },
  fonts: {
    primary: 'Open Sans',
  },
  shadows: {
    sm: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
    xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
    '2xl': '0 25px 50px -12px rgba(0,0,0,0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    outline: '0 0 0 3px rgba(66 153,22, 0.5)',
    none: 'none',
  },
  fontSizes: {
    f4: '1.5rem',
    f5: '1.25rem',
    f6: '1rem',
    f7: '0.825rem',
  },
  buttons: {},
  iconItemLists: {
    primary: { color: 'primary' },
  },
  taxonItems: {
    primary: {
      bg: 'white',
      display: 'block',
      color: 'primary',
      image: { width: '100%', pb: '100%' },
      boxShadow: 'inner',
      title: {
        p: 2,
        my: 0,
        fontFamily: 'primary',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 'f7',
        fontWeight: 400,
        height: 32,
      },
    },
  },
  entryCards: {
    primary: { color: 'primary', fontFamily: 'primary' },
  },
  productCards: {
    primary: { color: 'primary' },
  },
}

export default theme

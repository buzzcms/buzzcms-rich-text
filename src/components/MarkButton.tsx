/** @jsx jsx */

import { ReactNode } from 'react'
import { useSlate } from 'slate-react'
import { jsx } from 'theme-ui'

import { MarkType } from './types'
import { isMarkActive, toggleMark } from './utils'

export function MarkButton({
  format,
  icon,
  children,
}: {
  format: MarkType
  icon?: string
  children?: ReactNode
}) {
  const editor = useSlate()
  return (
    <span
      sx={{
        p: 2,
        mx: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isMarkActive(editor, format) ? 'white' : 'gray',
      }}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {children || icon}
    </span>
  )
}

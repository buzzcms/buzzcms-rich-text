/** @jsx jsx */

import { ReactNode } from 'react'
import { useSlate } from 'slate-react'
import { jsx } from 'theme-ui'

import { IconButton } from './IconButton'
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
    <IconButton
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {children || icon}
    </IconButton>
  )
}

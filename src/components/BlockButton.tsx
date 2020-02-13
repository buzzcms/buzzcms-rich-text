/** @jsx jsx */

import { ReactNode } from 'react'
import { useSlate } from 'slate-react'
import { jsx } from 'theme-ui'

import { BlockType } from './types'
import { isBlockActive, toggleBlock } from './utils'

export function BlockButton({
  format,
  icon,
  children,
}: {
  format: BlockType
  icon?: string
  children?: ReactNode
}) {
  const editor = useSlate()
  return (
    <span
      sx={{
        p: 2,
        mx: 1,
        color: isBlockActive(editor, format) ? 'white' : 'gray',
      }}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {children || icon}
    </span>
  )
}

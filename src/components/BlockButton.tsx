/** @jsx jsx */

import { ReactNode } from 'react'
import { useSlate } from 'slate-react'
import { jsx } from 'theme-ui'

import { IconButton } from './IconButton'
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
    <IconButton
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {children || icon}
    </IconButton>
  )
}

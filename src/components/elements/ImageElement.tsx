/** @jsx jsx */

import { RenderElementProps, useSelected } from 'slate-react'
import { jsx } from 'theme-ui'

export function ImageElement({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const selected = useSelected()
  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        sx={{
          mx: 'auto',
          maxWidth: 640,
          outline: selected ? '2px solid blue' : 'none',
        }}
      >
        <img
          sx={{ width: '100%', height: '75%', objectFit: 'cover' }}
          id={element.id}
          src={element.url}
          alt={element.alt}
        />
      </div>
      {children}
    </div>
  )
}

/** @jsx jsx */

import ReactPlayer from 'react-player'
import { RenderElementProps } from 'slate-react'
import { jsx } from 'theme-ui'

export function Video({ attributes, children, element }: RenderElementProps) {
  const { url } = element

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <ReactPlayer sx={{ mx: 'auto' }} url={url} />
      </div>
      {children}
    </div>
  )
}

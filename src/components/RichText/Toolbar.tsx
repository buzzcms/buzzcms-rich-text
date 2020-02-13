/** @jsx jsx */

import { useEditor } from 'slate-react'
import { jsx } from 'theme-ui'

import { insertImage, insertImageById } from './plugins/withImages'

export function Toolbar() {
  const editor = useEditor()
  return (
    <nav>
      <button
        onMouseDown={event => {
          event.preventDefault()
          const url = window.prompt('Enter the URL of the image:')
          if (!url) return
          insertImage(editor, url)
        }}
      >
        Image
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault()
          insertImageById(editor, 'EUQlOEK6jErL')
        }}
      />
      Image with ID
    </nav>
  )
}

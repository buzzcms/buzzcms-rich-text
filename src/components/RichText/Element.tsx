/** @jsx jsx */

import { RenderElementProps } from 'slate-react'
import { jsx } from 'theme-ui'

import { GalleriesElement } from './GalleriesElement'
// import { ImageElement } from './ImageElement'

export function Element(props: RenderElementProps) {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'galleries':
      return <GalleriesElement {...props} />
    // case 'image':
    //   return <ImageElement {...props} />
    case 'img':
      return (
        <div {...attributes}>
          <div contentEditable={false}>
            <div sx={{ width: '100%', pb: '75%', position: 'relative' }}>
              <img
                src={element.src}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </div>
          {children}
        </div>
      )
    case 'figure':
      return (
        <figure
          {...props}
          sx={{ mx: 'auto', maxWidth: 640, border: '1px solid gray' }}
        />
      )
    case 'figcaption':
      return (
        <figcaption
          sx={{ px: 2, py: 1, bg: 'lightgrey', textAlign: 'center' }}
          {...props}
        />
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

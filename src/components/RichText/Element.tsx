/** @jsx jsx */
import '@reach/tabs/styles.css'

import { TabPanel } from '@reach/tabs'
import { RenderElementProps } from 'slate-react'
import { jsx } from 'theme-ui'

import { GalleriesElement } from './GalleriesElement'
import { Tabs } from './TabList'
import { Video } from './Video'

export function Element(props: RenderElementProps) {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'link':
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      )
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
    case 'tabs':
      return <Tabs {...props} />
    case 'tab-panel':
      return <TabPanel {...props} />
    case 'video':
      return <Video {...props} />
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
      return <figure {...props} sx={{ mx: 'auto', maxWidth: 640 }} />
    case 'figcaption':
      return (
        <figcaption
          sx={{
            px: 2,
            py: 1,
            textAlign: 'center',
            fontStyle: 'italic',
            color: 'gray',
          }}
          {...props}
        />
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

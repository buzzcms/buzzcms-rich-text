/** @jsx jsx */
import '@reach/tabs/styles.css'
import '@reach/accordion/styles.css'

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@reach/accordion'
import { TabPanel } from '@reach/tabs'
import { RenderElementProps } from 'slate-react'
import { jsx } from 'theme-ui'

import { Video } from '../Video'
import { GalleriesElement } from './GalleriesElement'
import { TableElement } from './TableElement'
import { TabsElement } from './TabsElement'

export function Element(props: RenderElementProps) {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'mark':
      return <mark {...attributes}>{children}</mark>
    case 'hr':
      return <hr {...attributes} />
    case 'pre':
      return <pre {...attributes}>{children}</pre>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'link':
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      )
    case 'table':
      return <TableElement {...props} />
    case 'flex':
      return (
        <div
          sx={{ mb: 2, p: 2, ...element.style, display: 'flex' }}
          {...props}
        />
      )
    case 'grid':
      return (
        <div
          sx={{ mb: 2, p: 2, ...element.style, display: 'grid' }}
          {...props}
        />
      )
    case 'container':
      return <div sx={{ p: 2, ...element.style }} id={element.id} {...props} />
    case 'accordion':
      return (
        <Accordion collapsible multiple {...attributes}>
          {children}
        </Accordion>
      )
    case 'accordion-item':
      return (
        <AccordionItem {...attributes}>
          <AccordionButton>
            <span contentEditable={false}>{element.title}</span>
          </AccordionButton>
          <AccordionPanel>{children}</AccordionPanel>
        </AccordionItem>
      )
    case 'table-row':
      return <tr {...attributes}>{children}</tr>
    case 'table-head':
      return <th {...attributes}>{children}</th>
    case 'table-cell':
      return <td {...attributes}>{children}</td>
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
      return <TabsElement {...props} />
    case 'tab-panel':
      return <TabPanel {...props} />
    case 'video':
      return <Video {...props} />
    case 'image':
      return (
        <div {...attributes}>
          <div contentEditable={false}>
            <div sx={{ width: '100%' }}>
              <img
                src={element.src}
                sx={{
                  width: '100%',
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
      return <figcaption {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

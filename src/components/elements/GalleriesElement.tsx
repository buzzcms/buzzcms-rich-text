/** @jsx jsx */

import { forwardRef } from 'react'
import { Manager, Popper, Reference } from 'react-popper'
import { RenderElementProps, useSelected } from 'slate-react'
import { jsx } from 'theme-ui'

import { Portal } from '../HoverableToolbar'

export interface GalleryItem {
  id: string
  caption: string
  src?: string
}

const Gallery = forwardRef(({ items }: { items: GalleryItem[] }, ref: any) => {
  return (
    <div
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
      ref={ref}
    >
      {items.map((x, idx) => (
        <div key={idx} sx={{ width: ['50%', '33.33%', '25%'], p: 2 }}>
          <div>
            <div
              sx={{
                width: '100%',
                pb: '75%',
                position: 'relative',
              }}
            >
              <img
                src={x.src}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
            <div
              sx={{
                fontSize: 12,
                px: 2,
                py: 2,
                bg: '#f2f2f2',
              }}
            >
              {x.caption}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

export function GalleriesElement({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const items: GalleryItem[] = element.items
  const selected = useSelected()
  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        sx={{
          outline: selected ? '2px solid blue' : 'none',
          position: selected ? 'relative' : 'static',
        }}
      >
        <Manager>
          <Reference>
            {({ ref }) => <Gallery ref={ref} items={items} />}
          </Reference>
          <Portal>
            <Popper placement="top">
              {({ ref, style, placement, arrowProps }) =>
                selected && (
                  <div ref={ref} style={style} data-placement={placement}>
                    <button onClick={console.log}>Click me</button>
                    <div ref={arrowProps.ref} style={arrowProps.style} />
                  </div>
                )
              }
            </Popper>
          </Portal>
        </Manager>
      </div>
      {children}
    </div>
  )
}

/** @jsx jsx */

import { RenderElementProps, useSelected } from 'slate-react'
import { jsx } from 'theme-ui'

export function GalleriesElement({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const items: { id: string; caption: string; src?: string }[] = element.items
  const selected = useSelected()
  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mx: -2,
          outline: selected ? '2px solid blue' : 'none',
          position: selected ? 'relative' : 'static',
        }}
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
      {children}
    </div>
  )
}

/** @jsx jsx */

import { useEffect, useState } from 'react'
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdStrikethroughS,
} from 'react-icons/md'
import { animated, useTransition } from 'react-spring'
import { useSlate } from 'slate-react'
import { jsx } from 'theme-ui'

import { BlockButton } from './BlockButton'
import { Portal } from './HoverableToolbar'
import { MarkButton } from './MarkButton'

export function Toolbar(props: Omit<JSX.IntrinsicElements['div'], 'ref'>) {
  const editor = useSlate()
  const [isShow, setIsShow] = useState(false)
  useEffect(() => {
    const { selection } = editor
    setIsShow(!!selection)
  })

  const transitions = useTransition(isShow, null, {
    from: { opacity: 0, bottom: -100 },
    enter: { opacity: 1, bottom: 0 },
    leave: { opacity: 0, bottom: -100 },
  })

  return (
    <Portal>
      {transitions.map(
        ({ item, key, props: style }) =>
          item && (
            <animated.div
              key={key}
              style={style}
              {...props}
              sx={{
                bg: '#222',
                p: 2,
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <BlockButton format="heading-one">
                <span sx={{ fontWeight: 'bold', fontSize: 16 }}>H1</span>
              </BlockButton>
              <BlockButton format="heading-two">
                <span sx={{ fontWeight: 'bold', fontSize: 13 }}>H2</span>
              </BlockButton>
              <BlockButton format="heading-three">
                <span sx={{ fontWeight: 'bold', fontSize: 10 }}>H3</span>
              </BlockButton>
              <MarkButton format="bold">
                <MdFormatBold size={24} />
              </MarkButton>
              <MarkButton format="italic">
                <MdFormatItalic size={24} />
              </MarkButton>
              <MarkButton format="underline">
                <MdFormatUnderlined size={24} />
              </MarkButton>
              <MarkButton format="strike">
                <MdStrikethroughS size={24} />
              </MarkButton>
              <MarkButton format="code">
                <MdCode size={24} />
              </MarkButton>
              <BlockButton format="block-quote">
                <MdFormatQuote size={24} />
              </BlockButton>
              <BlockButton format="numbered-list">
                <MdFormatListNumbered size={24} />
              </BlockButton>
              <BlockButton format="bulleted-list">
                <MdFormatListBulleted size={24} />
              </BlockButton>
            </animated.div>
          ),
      )}
    </Portal>
  )
}

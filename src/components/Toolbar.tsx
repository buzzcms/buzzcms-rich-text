/** @jsx jsx */

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
import { jsx } from 'theme-ui'

import { BlockButton } from './BlockButton'
import { MarkButton } from './MarkButton'

export function Toolbar() {
  return (
    <div
      sx={{
        maxWidth: 768,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        zIndex: 10,
      }}
    >
      <div
        sx={{
          bg: '#222',
          p: 2,
          position: 'fixed',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
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
      </div>
    </div>
  )
}

/** @jsx jsx */

import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdLooksOne,
  MdLooksTwo,
} from 'react-icons/md'
import { jsx } from 'theme-ui'

import { BlockButton } from './BlockButton'
import { MarkButton } from './MarkButton'

export function Toolbar() {
  return (
    <div sx={{ bg: '#222', p: 2 }}>
      <MarkButton format="bold">
        <MdFormatBold />
      </MarkButton>
      <MarkButton format="italic">
        <MdFormatItalic />
      </MarkButton>
      <MarkButton format="underline">
        <MdFormatUnderlined />
      </MarkButton>
      <MarkButton format="code">
        <MdCode />
      </MarkButton>
      <BlockButton format="heading-one">
        <MdLooksOne />
      </BlockButton>
      <BlockButton format="heading-two">
        <MdLooksTwo />
      </BlockButton>
      <BlockButton format="block-quote">
        <MdFormatQuote />
      </BlockButton>
      <BlockButton format="numbered-list">
        <MdFormatListNumbered />
      </BlockButton>
      <BlockButton format="bulleted-list">
        <MdFormatListBulleted />
      </BlockButton>
    </div>
  )
}

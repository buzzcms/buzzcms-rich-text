import React, { useState } from 'react'
import { Node } from 'slate'

import RichText from '../src/components/RichText'
import { galleries } from './data/galleries'
import StoryWrapper from './StoryWrapper'

export default {
  title: 'Rich Text',
}

function Editor({ initialValue }: { initialValue: Node[] }) {
  const [value, setValue] = useState<Node[]>(initialValue)
  return (
    <StoryWrapper>
      <RichText value={value} onChange={setValue} />
    </StoryWrapper>
  )
}

export const Galleries = () => {
  return <Editor initialValue={galleries} />
}

Galleries.story = {
  name: 'Galleries',
}

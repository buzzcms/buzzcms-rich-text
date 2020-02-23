import compose from 'compose-function'
import { Editor } from 'slate'
import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'

import { withGalleries } from './withGalleries'
import { withHtml } from './withHtml'
import { withImages } from './withImages'
import { withLinks } from './withLinks'
import { withShortcuts } from './withShortcuts'
import { withTabs } from './withTabs'

export function withEditor(editor: Editor) {
  return compose(
    withGalleries,
    withImages,
    withLinks,
    withHtml,
    withShortcuts,
    withTabs,
    withReact,
    withHistory,
  )(editor)
}

export {
  withHistory,
  withReact,
  withGalleries,
  withHtml,
  withImages,
  withLinks,
  withShortcuts,
  withTabs,
}

/** @jsx jsx */

import isHotkey from 'is-hotkey'
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { createEditor, Editor, Node, Range, Transforms } from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  ReactEditor,
  RenderLeafProps,
  Slate,
  useEditor,
  useSlate,
  withReact,
} from 'slate-react'
import { jsx } from 'theme-ui'

import { Element } from './Element'
import { withGalleries } from './plugins/withGalleries'
import { withHtml } from './plugins/withHtml'
import { withImages } from './plugins/withImages'
import { withLinks } from './plugins/withLinks'
import { withShortcuts } from './plugins/withShortcuts'
import { withTabs } from './plugins/withTabs'
import { BlockType, MarkType } from './types'

export function Panel() {
  const editor = useEditor()
  const [selected, setSelected] = useState(() => getSelection())
  useEffect(() => {
    setSelected(getSelection())
  }, [editor.selection])

  return (
    <div>
      <div>{selected?.type}</div>
    </div>
  )
}

const HOTKEYS: { [key: string]: string } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
  'alt+x': 'show',
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const isMarkActive = (editor: ReactEditor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const toggleMark = (editor: ReactEditor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const Portal = ({ children }: { children: ReactNode }) => {
  return createPortal(children, document.body)
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const isBlockActive = (editor: ReactEditor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })

  return !!match
}

const toggleBlock = (editor: ReactEditor, format: BlockType) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}
const BlockButton = ({
  format,
  children,
}: {
  format: BlockType
  children: ReactNode
}) => {
  const editor = useSlate()
  return (
    <span
      sx={{
        p: 2,
        mx: 1,
        color: isBlockActive(editor, format) ? 'white' : 'gray',
      }}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {children}
    </span>
  )
}

const MarkButton = ({
  format,
  children,
}: {
  format: MarkType
  children: ReactNode
}) => {
  const editor = useSlate()
  return (
    <span
      sx={{
        p: 2,
        mx: 1,
        color: isMarkActive(editor, format) ? 'white' : 'gray',
      }}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {children}
    </span>
  )
}

function Toolbar() {
  const editor = useSlate()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection()
    if (!domSelection) {
      return
    }
    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()
    el.style.opacity = '1'
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
    el.style.left = `${rect.left +
      window.pageXOffset -
      el.offsetWidth / 2 +
      rect.width / 2}px`
  })

  return (
    <Portal>
      <div
        ref={ref}
        sx={{
          position: 'absolute',
          p: 2,
          top: -10000,
          left: -10000,
          opacity: 0,
          transition: 'opacity 0.75s',
          bg: '#222',
          mt: -2,
        }}
      >
        <BlockButton format="heading-two">H2</BlockButton>
        <BlockButton format="heading-three">H3</BlockButton>
        <MarkButton format="bold">B</MarkButton>
        <MarkButton format="italic">I</MarkButton>
        <MarkButton format="underline">U</MarkButton>
      </div>
    </Portal>
  )
}

export default function RichText({
  value,
  onChange,
}: {
  value: Node[]
  onChange: (value: Node[]) => void
}) {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const editor = useMemo(
    () =>
      withGalleries(
        withTabs(
          withLinks(
            withHtml(
              withImages(withShortcuts(withReact(withHistory(createEditor())))),
            ),
          ),
        ),
      ),
    [],
  )

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={v => {
        onChange(v)
      }}
    >
      <div
        sx={{
          bg: 'white',
          p: 3,
          maxWidth: 960,
          mx: 'auto',
          ul: {
            listStyle: 'disc',
            margin: '0 0 1.5em 3em',
          },
          blockquote: {
            borderLeft: '4px solid #1D4E89',
            bg: '',
            mx: 0,
            px: 3,
            color: '#1D4E89',
            fontStyle: 'italic',
          },
          '[data-reach-tab-panel]': {
            p: 3,
            bg: '#efefef',
          },
        }}
      >
        <Toolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write some markdown..."
          spellCheck
          autoFocus
          onKeyDown={(event: any) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                if (mark === 'show') {
                  const { selection } = editor
                  if (!selection) {
                    return
                  }
                  if (!Range.isCollapsed(selection)) {
                    return
                  }
                  const { anchor } = selection
                  const [[node]] = Editor.nodes(editor, {
                    at: anchor,
                    match: n => n.type === 'list-item',
                  })
                  const text = Editor.string(editor, selection)
                  console.log({ text, node })
                }
                toggleMark(editor, mark)
              }
            }
          }}
        />
      </div>
    </Slate>
  )
}

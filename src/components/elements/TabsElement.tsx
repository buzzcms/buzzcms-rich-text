/** @jsx jsx */

import {
  Tab,
  TabList as ReachTabList,
  TabPanels,
  Tabs as ReachTabs,
} from '@reach/tabs'
import { RenderElementProps } from 'slate-react'
import { jsx } from 'theme-ui'

export function TabsElement({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const items: { title: string }[] = element.items
  return (
    <ReachTabs {...attributes}>
      <ReachTabList contentEditable={false}>
        {items.map((item, idx) => (
          <Tab key={idx}>{item.title}</Tab>
        ))}
      </ReachTabList>
      <TabPanels>{children}</TabPanels>
    </ReachTabs>
  )
}

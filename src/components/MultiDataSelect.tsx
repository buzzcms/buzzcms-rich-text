/** @jsx jsx */

import { Button, MenuItem } from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'
import { useMemo } from 'react'
import { jsx } from 'theme-ui'

export interface MultiDataSelectProps {
  q: string
  setQ: (q: string) => void
  items: any[]
  value: any[]
  labelField?: string
  onCreate: (item: any) => void
  onRemove: (item: any) => void
}

export default function MultiDataSelect({
  value,
  items,
  q,
  setQ,
  labelField = 'title',
  onCreate,
  onRemove,
  ...props
}: MultiDataSelectProps) {
  const Select = useMemo(() => MultiSelect.ofType<any>(), [])
  const clearButton =
    value.length > 0 ? (
      <Button
        icon="cross"
        minimal={true}
        // onClick={() => onChange({ entities: [], mode: 'clear' })}
      />
    ) : (
      undefined
    )
  return (
    <Select
      {...props}
      items={items}
      selectedItems={value}
      onItemSelect={v => {
        if (value.some(({ id }) => id === v.id)) {
          onRemove(v)
        } else {
          onCreate(v)
        }
      }}
      tagRenderer={item => item[labelField]}
      tagInputProps={{
        rightElement: clearButton,
        onRemove: (_, idx) => {
          onRemove(value[idx])
        },
      }}
      query={q}
      onQueryChange={v => setQ(v)}
      resetOnSelect
      itemsEqual={(a, b) => a.id === b.id}
      itemRenderer={(item, { modifiers, handleClick }) => (
        <MenuItem
          active={modifiers.active}
          icon={
            value.map((x: any) => x.id).includes(item.id) ? 'tick' : 'blank'
          }
          key={item.id}
          text={item[labelField]}
          onClick={handleClick}
          shouldDismissPopover={false}
        />
      )}
    />
  )
}

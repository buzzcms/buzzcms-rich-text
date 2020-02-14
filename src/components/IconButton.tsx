/** @jsx jsx */

import { jsx } from 'theme-ui'

type ButtonProps = JSX.IntrinsicElements['button']

export interface IconButtonProps extends ButtonProps {
  active?: boolean
}

export function IconButton({ active, ...rest }: IconButtonProps) {
  return (
    <button
      {...rest}
      sx={{
        p: 2,
        mx: 1,
        border: 'none',
        bg: 'transparent',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'white' : 'gray',
      }}
    />
  )
}

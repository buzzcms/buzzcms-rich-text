export const style = {
  bg: 'white',
  p: 4,
  maxWidth: 768,
  mx: 'auto',
  ul: {
    listStyle: 'disc',
    margin: '0 0 1.5em 3em',
  },
  ol: {
    margin: '0 0 1.5em 3em',
    p: 0,
  },
  '[data-reach-tabs]': { my: 3 },
  '[data-reach-tab-panel]': {
    p: 3,
    bg: '#f7f7f7',
  },
  '[data-reach-tab]': {
    p: 3,
    textTransform: 'uppercase',
    fontSize: 's',
  },
  '[data-reach-tab-list]': { bg: '#fcfcfc' },
  '[data-reach-tab][data-selected]': {
    borderTop: '4px solid #231f20',
    borderBottom: 'none',
    bg: '#f7f7f7',
  },
  blockquote: {
    bg: '#f7f7f7',
    mx: 0,
    p: 4,
    borderLeft: '4px solid #231f20',
  },
  mark: {
    bg: '#FFF7A8',
  },
  hr: {
    borderTop: '3px dotted #e6e6e6',
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
  },
  table: {
    borderSpacing: 0,
    width: '100%',
  },
  td: {
    p: 1,
    borderBottom: '2px solid gray',
  },
  '[data-reach-accordion-item]': {
    mb: 2,
  },
  '[data-reach-accordion-panel]': {
    border: '1px solid gray',
    p: 2,
  },
  '[data-reach-accordion-button]': {
    width: '100%',
    bg: 'primary',
    color: 'white',
    p: 2,
    fontSize: 'f5',
    textAlign: 'left',
    border: 'none',
  },
}

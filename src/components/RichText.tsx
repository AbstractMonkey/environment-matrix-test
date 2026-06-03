import type { ContentBlock, CalloutTone } from '../types'

// A deliberately tiny inline formatter: **bold** and `code`. Content stays as
// data in the curriculum, not as embedded markup.
const INLINE = /(\*\*[^*]+\*\*|`[^`]+`)/g

export function Inline({ text }: { text: string }) {
  const parts = text.split(INLINE).filter((p) => p.length > 0)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) {
          return <strong key={i}>{p.slice(2, -2)}</strong>
        }
        if (p.startsWith('`') && p.endsWith('`')) {
          return <code key={i}>{p.slice(1, -1)}</code>
        }
        return <span key={i}>{p}</span>
      })}
    </>
  )
}

const CALLOUT_ICON: Record<CalloutTone, string> = {
  tip: '💡',
  warning: '⚠️',
  key: '🧭',
  rule: '⚖️',
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case 'p':
      return <p><Inline text={block.text} /></p>
    case 'h':
      return <h3 className="block-h"><Inline text={block.text} /></h3>
    case 'list':
      return block.ordered ? (
        <ol>{block.items.map((it, i) => <li key={i}><Inline text={it} /></li>)}</ol>
      ) : (
        <ul>{block.items.map((it, i) => <li key={i}><Inline text={it} /></li>)}</ul>
      )
    case 'steps':
      return (
        <div className="steps">
          {block.title && <p className="steps-title">{block.title}</p>}
          <ol>{block.items.map((it, i) => <li key={i}><Inline text={it} /></li>)}</ol>
        </div>
      )
    case 'callout':
      return (
        <aside className={`callout callout-${block.tone}`} role="note">
          <span className="callout-icon" aria-hidden="true">{CALLOUT_ICON[block.tone]}</span>
          <div>
            {block.title && <p className="callout-title">{block.title}</p>}
            <p><Inline text={block.text} /></p>
          </div>
        </aside>
      )
    case 'table':
      return (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>{block.head.map((h, i) => <th key={i}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>{row.map((cell, c) => <td key={c}><Inline text={cell} /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export function RichText({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="richtext">
      {blocks.map((b, i) => <Block key={i} block={b} />)}
    </div>
  )
}

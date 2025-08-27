// utils/slateToReact.tsx
import React from 'react'
import Image from 'next/image'

// Proper Slate.js types
interface SlateText {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  [key: string]: any
}

interface SlateElement {
  type: string
  children: SlateNode[]
  url?: string
  level?: number
  align?: 'left' | 'center' | 'right' | 'justify'
  [key: string]: any
}

type SlateNode = SlateText | SlateElement

// Type guards
const isText = (node: SlateNode): node is SlateText => {
  return 'text' in node
}

const isElement = (node: SlateNode): node is SlateElement => {
  return 'children' in node && Array.isArray((node as any).children)
}

export const SlateToReact = ({
  nodes,
}: {
  nodes: SlateNode[]
}): React.ReactNode => {
  if (!nodes || !Array.isArray(nodes)) {
    return null
  }

  return nodes.map((node, index) => {
    // Handle text nodes with formatting
    if (isText(node)) {
      let content: React.ReactNode = node.text

      // Apply text formatting in proper order
      if (node.bold) {
        content = <strong>{content}</strong>
      }
      if (node.italic) {
        content = <em>{content}</em>
      }
      if (node.underline) {
        content = <u>{content}</u>
      }
      if (node.strikethrough) {
        content = <s>{content}</s>
      }
      if (node.code) {
        content = <code className='inline-code'>{content}</code>
      }

      return <React.Fragment key={index}>{content}</React.Fragment>
    }

    // Handle element nodes
    if (isElement(node)) {
      const children = <SlateToReact nodes={node.children} />
      const key = index

      switch (node.type) {
        case 'paragraph':
          return (
            <p
              key={key}
              style={node.align ? { textAlign: node.align } : undefined}
            >
              {children}
            </p>
          )

        case 'heading-one':
        case 'h1':
          return <h1 key={key}>{children}</h1>

        case 'heading-two':
        case 'h2':
          return <h2 key={key}>{children}</h2>

        case 'heading-three':
        case 'h3':
          return <h3 key={key}>{children}</h3>

        case 'heading-four':
        case 'h4':
          return <h4 key={key}>{children}</h4>

        case 'heading-five':
        case 'h5':
          return <h5 key={key}>{children}</h5>

        case 'heading-six':
        case 'h6':
          return <h6 key={key}>{children}</h6>

        case 'bulleted-list':
        case 'ul':
          return <ul key={key}>{children}</ul>

        case 'numbered-list':
        case 'ol':
          return <ol key={key}>{children}</ol>

        case 'list-item':
        case 'li':
          return <li key={key}>{children}</li>

        case 'link':
          return (
            <a
              key={key}
              href={node.url}
              target={node.target || '_self'}
              rel={node.target === '_blank' ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          )

        case 'blockquote':
          return <blockquote key={key}>{children}</blockquote>

        case 'code-block':
        case 'code_block':
          return (
            <pre key={key}>
              <code className='code-block'>{children}</code>
            </pre>
          )

        case 'horizontal-rule':
        case 'hr':
          return <hr key={key} />

        case 'image':
          return (
            <Image
              key={key}
              src={node.url}
              alt={node.alt || ''}
              width={node.width || 400}
              height={node.height || 300}
            />
          )

        case 'table':
          return <table key={key}>{children}</table>

        case 'table-row':
        case 'tr':
          return <tr key={key}>{children}</tr>

        case 'table-cell':
        case 'td':
          return <td key={key}>{children}</td>

        case 'table-header':
        case 'th':
          return <th key={key}>{children}</th>

        case 'break':
        case 'br':
          return <br key={key} />

        // Fallback for unknown elements
        default:
          // Handle elements without a type (treat as paragraphs)
          if (!node.type) {
            return <p key={key}>{children}</p>
          }
          console.warn(`Unknown Slate node type: ${node.type}`)
          return (
            <div key={key} data-slate-type={node.type}>
              {children}
            </div>
          )
      }
    }

    // Fallback for unexpected node structure
    console.warn('Unexpected Slate node structure:', node)
    return null
  })
}

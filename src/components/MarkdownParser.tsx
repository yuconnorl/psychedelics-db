import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'

// Component to render Markdown as HTML
const MarkdownParser: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[
        remarkGfm, // GitHub Flavored Markdown
        remarkToc, // Table of Contents generation
      ]}
      rehypePlugins={[
        rehypeRaw, // Support for raw HTML
        rehypeHighlight, // Code syntax highlighting
      ]}
      components={{
        // Custom component overrides
        h1: ({ node, ...props }) => (
          <h1 className='text-3xl font-bold mb-4' {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className='text-2xl font-semibold mb-3' {...props} />
        ),
        strong: ({ node, ...props }) => (
          <strong className='font-bold text-gray-800' {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className='list-disc pl-5 mb-4' {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className='list-decimal pl-5 mb-4' {...props} />
        ),
        li: ({ node, ...props }) => <li className='mb-2' {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default MarkdownParser

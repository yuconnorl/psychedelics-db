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
          <h1 className='mb-4 text-3xl font-bold' {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className='mb-3 text-2xl font-semibold' {...props} />
        ),
        strong: ({ node, ...props }) => (
          <strong className='font-bold text-gray-800' {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className='mb-4 list-disc pl-5' {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className='mb-4 list-decimal pl-5' {...props} />
        ),
        li: ({ node, ...props }) => <li className='mb-2' {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default MarkdownParser

'use client'

import { useEffect, useState } from 'react'
import { ProseMirror } from '@nytimes/react-prosemirror'
import { schema } from 'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'

const ProseMirrorEditor = () => {
  // It's important that mount is stored as state,
  // rather than a ref, so that the ProseMirror component
  // is re-rendered when it's set
  const [mount, setMount] = useState<HTMLElement | null>(null)
  const [editorState, setEditorState] = useState<EditorState | null>(
    EditorState.create({ schema }),
  )

  useEffect(() => {
    console.log('editorState', editorState)
    console.log('editorState', editorState.doc.toString())
  }, [editorState])

  return (
    <ProseMirror
      mount={mount}
      state={editorState}
      dispatchTransaction={(tr) => {
        setEditorState((s) => s.apply(tr))
      }}
    >
      <div className='focus:outline-none' ref={setMount} />
    </ProseMirror>
  )
}

export default ProseMirrorEditor

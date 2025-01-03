import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

const placeholderKey = new PluginKey('placeholder')

export function placeholderPlugin(): Plugin {
  return new Plugin({
    key: placeholderKey,
    props: {
      decorations: (state) => {
        const empty = state.doc.textContent.length === 0
        if (empty) {
          return DecorationSet.create(state.doc, [
            Decoration.widget(
              1,
              () => {
                const placeholder = document.createElement('span')
                placeholder.className = 'prosemirror-placeholder'
                placeholder.textContent = 'Ask everything about psychedelics'
                return placeholder
              },
              { key: 'placeholder' },
            ),
          ])
        }
        return DecorationSet.empty
      },
    },
  })
}

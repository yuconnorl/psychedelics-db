// eslint-disable-next-line import/named
import { useInstantSearch } from 'react-instantsearch'

type NoResultsBoundaryProps = {
  fallback: JSX.Element
  children: JSX.Element
}

const NoResultsBoundary = ({
  children,
  fallback,
}: NoResultsBoundaryProps): JSX.Element => {
  const { results } = useInstantSearch()

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    )
  }

  return children
}

export default NoResultsBoundary

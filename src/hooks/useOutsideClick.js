import { useEffect, useRef } from 'react'

export function useOutsideClick(handler, listenCapture = true) {
  const ref = useRef()

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log('click outside')
        handler()
      }
    }

    // event will go from top to bottom in DOM tree, not a vice versa as a default behaviour
    // document.addEventListener('click', handleClick, {capture: true}) // the same
    document.addEventListener('click', handleClick, listenCapture)

    return () => document.removeEventListener('click', handleClick, listenCapture)
  }, [handler, listenCapture])

  return ref
}

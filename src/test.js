import { fromEventPattern } from 'rxjs'

const Test = () => {
  function addClickHandler(handler) {
    document.addEventListener('click', handler)
  }

  function removeClickHandler(handler) {
    document.removeEventListener('click', handler)
  }

  const clicks = fromEventPattern(addClickHandler, removeClickHandler)
  clicks.subscribe((x) => console.log(x))

  return <div>123</div>
}

export default Test

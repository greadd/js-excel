import { $ } from '@core/dom'
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function onResize(event, root) {
  if (event.target.dataset.resize) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()

    let value
    $resizer.css({
      opacity: 1
    })
    const type = $resizer.data.resize

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({
          right: -delta + 'px',
          bottom: '-5000px'
        })
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({
          bottom: -delta + 'px',
          right: '-5000px'
        })
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      if (type === 'col') {
        $parent.css({
          width: value + 'px'
        })
        root
          .findAll(`[data-col="${$parent.data.col}"`)
          .forEach(cell => (cell.style.width = value + 'px'))
      } else {
        $parent.css({
          height: value + 'px'
        })
      }

      $resizer.css({
        bottom: 0,
        opacity: 0,
        right: 0
      })
    }
  }
}

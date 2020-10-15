import { toInlineStyles } from '../../core/utils'
import { defaultStyles } from '@/constants'
import { parse } from '../../core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
        <div
        class="cell"
        contentEditable
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        data-value="${data || ''}"
        style="${styles}; width:${width};"
        >${parse(data) || ''}</div>
      `
  }
}

function toColumn({ col, index, width }) {
  const colResize = '<div class="col-resize" data-resize="col"></div>'
  return `
    <div class="column"
    data-type="resizable"
    data-col="${index}"
    style="width: ${width}"
    >${col}
    ${colResize}
    </div>
  `
}

function createRow(index, content, state) {
  const rowResize = '<div class="row-resize" data-resize="row"></div>'
  const resizer = index ? rowResize : ''
  const height = getHeight(state, index)
  return `
    <div class="row"
    data-type="resizable"
    data-row="${index}"
    style="height: ${height}">
      <div class="row-info">${index || ''}
      ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(toCell(state, row)).join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}

const CODES = {
  A: 65,
  Z: 90
}

// function toCell(_, index) {
//   return `
//     <div class="cell" contentEditable data-col="${index}"></div>
//   `
// }

function toCell(row) {
  return function(_, col) {
    return `
        <div
        class="cell"
        contentEditable
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        ></div>
      `
  }
}

function toColumn(col, index) {
  const colResize = '<div class="col-resize" data-resize="col"></div>'
  return `
    <div class="column" data-type="resizable" data-col="${index}">${col}
    ${colResize}
    </div>
  `
}

function createRow(index, content) {
  const rowResize = '<div class="row-resize" data-resize="row"></div>'
  const resizer = index ? rowResize : ''
  return `
    <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(row))
      .join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}

import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { sholdResize } from './table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (sholdResize(event)) {
      resizeHandler(this.$root, event)
    }
  }
}

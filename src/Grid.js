// @flow
/* eslint-disable no-param-reassign, no-underscore-dangle */
import { random } from 'lodash'
import Cell from './Cell'

class Grid {
  _rows: number
  _columns: number
  grid: Array<Array<?Cell>>

  get rows(): number {
    return this._rows
  }

  set rows(rows: number): void {
    this._rows = rows
  }

  get columns(): number {
    return this._columns
  }

  set columns(columns: number): void {
    this._columns = columns
  }

  constructor(rows: number, columns: number) {
    this._rows = rows
    this._columns = columns

    this.grid = this.prepareGrid()
    this.configureCells()
  }

  inspect() {
    let output = `+${'---+'.repeat(this.columns)}\n`

    this.grid.forEach(row => {
      let top = '|'
      let bottom = '+'

      row.forEach(maybeCell => {
        const cell: Cell = maybeCell || new Cell(-1, -1)

        const body = ` ${this.contentsOf(cell)} `
        const eastBoundary = cell.linked(cell.east) ? ' ' : '|'

        top = top.concat(body).concat(eastBoundary)

        const southBoundary = cell.linked(cell.south) ? '   ' : '---'
        const corner = '+'

        bottom = bottom.concat(southBoundary).concat(corner)
      })

      output = output
        .concat(top)
        .concat('\n')
        .concat(bottom)
        .concat('\n')
    })

    return output
  }

  prepareGrid(): Array<Array<Cell>> {
    return Array(this.rows)
      .fill()
      .map((v: number, index: number) => index)
      .map(row =>
        Array(this.columns)
          .fill()
          .map((v: number, index: number) => index)
          .map((column: Cell) => new Cell(row, column)),
      )
  }

  configureCells() {
    this.grid.forEach(row =>
      row.forEach(cell => {
        cell.north = this.getCell(cell.row - 1, cell.column)
        cell.south = this.getCell(cell.row + 1, cell.column)
        cell.east = this.getCell(cell.row, cell.column + 1)
        cell.west = this.getCell(cell.row, cell.column - 1)
      }),
    )
  }

  getCell(row: number, column: number): ?Cell {
    if (row < 0 || row > this.rows - 1) return null
    if (column < 0 || column > this.grid[row].length - 1) return null

    return this.grid[row][column]
  }

  randomCell(): ?Cell {
    const row = random(this.rows - 1)
    const column = random(this.grid[row].length - 1)
    return this.getCell(row, column)
  }

  size(): number {
    return this.rows * this.columns
  }

  // eslint-disable-next-line
  contentsOf(cell: Cell): string {
    return ' '
  }
}

export default Grid

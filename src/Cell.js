// @flow
/* eslint-disable no-underscore-dangle, arrow-parens, comma-dangle */
import { Map } from 'immutable'
import Distances from './Distances'

class Cell {
  _row: number
  _column: number
  _north: Cell
  _south: Cell
  _east: Cell
  _west: Cell
  _links: Map<Cell, boolean>

  get row(): number {
    return this._row
  }

  set row(row: number): void {
    this._row = row
  }

  get column(): number {
    return this._column
  }

  set column(column: number): void {
    this._column = column
  }

  get north(): Cell {
    return this._north
  }

  set north(north: Cell): void {
    this._north = north
  }

  get south(): Cell {
    return this._south
  }

  set south(south: Cell): void {
    this._south = south
  }

  get east(): Cell {
    return this._east
  }

  set east(east: Cell): void {
    this._east = east
  }

  get west(): Cell {
    return this._west
  }

  set west(west: Cell): void {
    this._west = west
  }

  get links(): Iterator<Cell> {
    return this._links.keys()
  }

  set links(links: Map<Cell, boolean>): void {
    this._links = links
  }

  get neighbors(): Array<Cell> {
    const list = []
    if (this.north) list.push(this.north)
    if (this.south) list.push(this.south)
    if (this.east) list.push(this.east)
    if (this.west) list.push(this.west)
    return list
  }

  constructor(row: number, column: number) {
    this._row = row
    this._column = column
    this._links = new Map()
  }

  link(cell: Cell, bidirectional: boolean = true) {
    this._links = this._links.set(cell, true)
    if (bidirectional) cell.link(this, false)
    return this
  }

  unlink(cell: Cell, bidirectional: boolean = true) {
    this.links = this._links.delete(cell)
    if (bidirectional) cell.unlink(this, false)
    return this
  }

  linked(cell: Cell): boolean {
    return this._links.has(cell)
  }

  distances() {
    const distances: Distances = new Distances(this)
    let frontier = [this]

    while (frontier.length) {
      const newFrontier = []
      frontier.forEach(cell => {
        cell._links.mapKeys(linked => {
          if (distances._cells.has(linked)) return
          distances.setDistanceForCell(
            linked,
            distances.getDistanceForCell(cell) + 1,
          )
          newFrontier.push(linked)
        })
      })

      frontier = newFrontier
    }

    return distances
  }
}

export default Cell

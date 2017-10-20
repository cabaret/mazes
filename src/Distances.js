/* eslint-disable no-underscore-dangle, no-loop-func */
import { Map } from 'immutable'

class Distances {
  constructor(root) {
    this._root = root
    this._cells = Map()
    this.setDistanceForCell(this._root, 0)
  }

  get cells() {
    return this._cells.keys()
  }

  getDistanceForCell(cell) {
    return this._cells.get(cell)
  }

  setDistanceForCell(cell, distance) {
    this._cells = this._cells.set(cell, distance)
  }

  max() {
    let maxDistance = 0
    let maxCell = this._root

    this._cells.forEach((distance, cell) => {
      if (distance > maxDistance) {
        maxCell = cell
        maxDistance = distance
      }
    })

    return [maxCell, maxDistance]
  }

  pathTo(goal) {
    let current = goal

    const breadcrumbs = new Distances(this._root)
    breadcrumbs.setDistanceForCell(current, this.getDistanceForCell(current))

    while (
      !(current.row === this._root.row && current.column === this._root.column)
    ) {
      current._links.mapKeys(neighbor => {
        if (
          this.getDistanceForCell(neighbor) < this.getDistanceForCell(current)
        ) {
          breadcrumbs.setDistanceForCell(
            neighbor,
            this.getDistanceForCell(neighbor),
          )
          current = neighbor
        }
      })
    }

    return breadcrumbs
  }
}

export default Distances

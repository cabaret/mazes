/* eslint-disable no-underscore-dangle */
import Grid from './Grid'

class DistanceGrid extends Grid {
  get distances() {
    return this._distances
  }

  set distances(distances) {
    this._distances = distances
  }

  contentsOf(cell) {
    if (this._distances && this._distances._cells.has(cell)) {
      return this._distances.getDistanceForCell(cell).toString(36)
    }

    return super.contentsOf(cell)
  }
}

export default DistanceGrid

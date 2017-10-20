/* eslint-disable no-underscore-dangle */
import { sample } from 'lodash'

class AldousBroder {
  static on(grid) {
    let cell = grid.randomCell()
    let unvisited = grid.size() - 1

    while (unvisited > 1) {
      const neighbor = sample(cell.neighbors)
      if (neighbor._links.isEmpty()) {
        cell.link(neighbor)
        unvisited -= 1
      }

      cell = neighbor
    }

    return grid
  }
}

export default AldousBroder

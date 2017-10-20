import { sample } from 'lodash'

class BinaryTree {
  static on({ grid }) {
    grid.forEach(row => {
      row.forEach(cell => {
        const neighbors = []
        if (cell.north) neighbors.push(cell.north)
        if (cell.east) neighbors.push(cell.east)

        const neighbor = sample(neighbors)

        if (neighbor) cell.link(neighbor)
      })
    })

    return grid
  }
}

export default BinaryTree

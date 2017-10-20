// @flow
import { sample } from 'lodash'

class Sidewinder {
  static on({ grid }) {
    grid.forEach(row => {
      let run: Array<Cell> = []
      row.forEach(cell => {
        run.push(cell)

        const atEasternBoundary: boolean = cell.east === null
        const atNorthernBoundary: boolean = cell.north === null

        const shouldCloseOut: boolean =
          atEasternBoundary || (!atNorthernBoundary && sample([true, false]))

        if (shouldCloseOut) {
          const member: Cell = sample(run)
          if (member.north) member.link(member.north)
          run = []
        } else {
          cell.link(cell.east)
        }
      })
    })

    return grid
  }
}

export default Sidewinder

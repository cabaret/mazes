/* eslint-disable no-console */
import { prop, head, compose } from 'ramda'
import DistanceGrid from './DistanceGrid'
import BinaryTree from './BinaryTree'

const getFirstColumn = compose(head, head, prop('grid'))

const grid = new DistanceGrid(10, 10)
BinaryTree.on(grid)

const distances = getFirstColumn(grid).distances()

grid.distances = distances

console.log(grid)
console.log('path from northwest corner to southwest corner:')
grid.distances = distances.pathTo(grid.grid[grid.rows - 1][0])
console.log(grid)

distances.max()

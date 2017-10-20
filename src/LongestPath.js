// @flow
/* eslint-disable no-console */
import { prop, head, compose } from 'ramda'
import DistanceGrid from './DistanceGrid'
import BinaryTree from './BinaryTree'

const getFirstColumn: Cell = compose(head, head, prop('grid'))

const grid: DistanceGrid = new DistanceGrid(10, 10)
BinaryTree.on(grid)

const distances = getFirstColumn(grid).distances()
const [newStart] = distances.max()

const newDistances = newStart.distances()
const [goal] = newDistances.max()

grid.distances = newDistances.pathTo(goal)
console.log(grid)

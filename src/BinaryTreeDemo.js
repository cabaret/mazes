/* eslint-disable no-console */
import Grid from './Grid'
import BinaryTree from './BinaryTree'

const grid = new Grid(20, 20)
BinaryTree.on(grid)
console.log(grid)

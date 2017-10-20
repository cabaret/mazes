// @flow
/* eslint-disable no-console */
import Grid from './Grid'
import Sidewinder from './Sidewinder'

const grid: Grid = new Grid(20, 20)
Sidewinder.on(grid)
console.log(grid)

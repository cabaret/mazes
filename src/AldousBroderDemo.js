// @flow
/* eslint-disable no-console */
import Grid from './Grid'
import AldousBroder from './AldousBroder'

const grid: Grid = new Grid(20, 20)
AldousBroder.on(grid)
console.log(grid)

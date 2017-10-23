'use strict'

var {startEvolution} = require("./gene")

var {getInputTable} = require("./sim")

var size = 50;
var batchSize = 200000;

var target = "00100110110010100110010100010100011100101100110110"

//startEvolution(batchSize,size,target)

var r = getInputTable(3)

console.log(r)

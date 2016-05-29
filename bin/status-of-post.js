#!/usr/bin/env node

const JSerStat = require("jser-stat").JSerStat;
const stat = new JSerStat();
const calc = require("../lib/status-of-post");
const results = calc(stat);
console.log("平均値:" + results.average);
console.log("中央値:" + results.median);
console.log("現在値:" + results.current);

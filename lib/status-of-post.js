// LICENSE : MIT
"use strict";
const JSerStat = require("jser-stat").JSerStat;
const stat = new JSerStat();
const jSerWeeks = stat.getJSerWeeks();

const latestWeek = jSerWeeks[jSerWeeks.length - 1];
const now = new Date();
const endDate = latestWeek.endDate;
const unpublishedItems = stat.findItemsBetween(endDate, now);


/*
 * 平均を求める
 */
function average(data) {
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum = sum + data[i];
    }
    return (sum / data.length);
}
var median = function (arr) {
    var half = (arr.length / 2) | 0;
    var temp = arr.sort();

    if (temp.length % 2) {
        return temp[half];
    }

    return (temp[half - 1] + temp[half]) / 2;
};
var itemCountList = jSerWeeks.map(function (week) {
    return week.items.length;
});
console.log("平均値:" + average(itemCountList));
console.log("中央値:" + median(itemCountList));
console.log("現在値:" + unpublishedItems.length);

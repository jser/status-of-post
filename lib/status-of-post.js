// LICENSE : MIT
"use strict";
/**
 * 平均を求める
 * @param data
 * @returns {number}
 */
function average(data) {
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum = sum + data[i];
    }
    return (sum / data.length);
}
/**
 * 中央値を求める
 * @param arr
 * @returns {*}
 */
function median(arr) {
    var half = (arr.length / 2) | 0;
    var temp = arr.sort();

    if (temp.length % 2) {
        return temp[half];
    }

    return (temp[half - 1] + temp[half]) / 2;
}
module.exports = function calcData(stat) {
    var jSerWeeks = stat.getJSerWeeks();
    var latestWeek = jSerWeeks[jSerWeeks.length - 1];
    var now = new Date();
    var endDate = latestWeek.endDate;
    var unpublishedItems = stat.findItemsBetween(endDate, now);
    var itemCountList = jSerWeeks.map(function (week) {
        return week.items.length;
    });
    return {
        average: average(itemCountList),
        median: median(itemCountList),
        current: unpublishedItems.length
    };
};

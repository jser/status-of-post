/**
 * 平均を求める
 * @param data
 * @returns {number}
 */
function average(data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
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
    const half = (arr.length / 2) | 0;
    const temp = arr.sort();
    
    if (temp.length % 2) {
        return temp[half];
    }
    
    return (temp[half - 1] + temp[half]) / 2;
}

export function calcData(stat) {
    const jSerWeeks = stat.getJSerWeeks();
    const latestWeek = jSerWeeks[jSerWeeks.length - 1];
    const now = new Date();
    const endDate = latestWeek.endDate;
    const unpublishedItems = stat.findItemsBetween(endDate, now);
    const itemCountList = jSerWeeks.map(function (week) {
        return week.items.length;
    });
    return {
        average: Math.trunc(average(itemCountList)),
        median: Math.trunc(median(itemCountList)),
        current: unpublishedItems.length
    };
}

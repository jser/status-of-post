// LICENSE : MIT
"use strict";
var JSerStat = require("jser-stat").JSerStat;
var calcStatus = require("./status-of-post");
function fetchURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL);
        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(Error(req.statusText));
        };
        req.send();
    });
}
function getStat() {
    // APIで取ってくる方式
    if (getStat._jSerStat) {
        return Promise.resolve(getStat._jSerStat);
    }
    return Promise.all([
        fetchURL("http://jser.info/posts.json"),
        fetchURL("http://jser.info/source-data/items.json")
    ]).then(function (results) {
        var posts = JSON.parse(results[0]).reverse();
        var items = JSON.parse(results[1]);
        var jSerStat = new JSerStat(items, posts);
        getStat._jSerStat = jSerStat;
        return jSerStat;
    });
}

function main() {
    var average = document.getElementById("average");
    var median = document.getElementById("median");
    var current = document.getElementById("current");
    getStat().then(function (stat) {
        var results = calcStatus(stat);
        average.textContent = "平均値:" + results.average;
        median.textContent = "中央値:" + results.median;
        current.textContent = "現在値:" + results.current;
    });
}

window.onload = function () {
    main();
};
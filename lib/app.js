import { calcData } from "./status-of-post.js";
import { JSerStat } from "https://esm.sh/jser-stat";

function fetchURL(URL) {
    return fetch(URL).then(function (response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
}

function getStat() {
    // APIで取ってくる方式
    if (getStat._jSerStat) {
        return Promise.resolve(getStat._jSerStat);
    }
    return Promise.all([
        fetchURL("https://jser.info/posts.json"),
        fetchURL("https://jser.info/source-data/items.json")
    ]).then(function ([_posts,_items]) {
        const posts = _posts.reverse();
        const items = _items;
        const jSerStat = new JSerStat(items, posts);
        getStat._jSerStat = jSerStat;
        return jSerStat;
    });
}

async function main() {
    const average = document.getElementById("average");
    const median = document.getElementById("median");
    const current = document.getElementById("current");
    const stat = await getStat();
    const results = calcData(stat);
    average.textContent = results.average;
    median.textContent = results.median;
    current.textContent = results.current;
}

await main();

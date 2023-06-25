/**
 *
 * @returns {Promise<{average:number; median:number;current:number}>}
 */
function getStat() {
    return fetch("https://jser-status.deno.dev/").then(res => res.json());
}

async function main() {
    const results = await getStat();
    const average = document.getElementById("average");
    const median = document.getElementById("median");
    const current = document.getElementById("current");
    average.textContent = results.average;
    median.textContent = results.median;
    current.textContent = results.current;
}

try {
    await main();
} catch (e) {
    console.error(e);
    document.body.textContent = e.message;
}

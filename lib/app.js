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
    average.textContent = String(results.average);
    median.textContent = String(results.median);
    current.textContent = String(results.current);
    
    // if url has ?widget add to .widget class to show widget
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("widget")) {
        document.body.classList.add("widget");
    }
}

try {
    await main();
} catch (e) {
    console.error(e);
    document.body.textContent = e.message;
}

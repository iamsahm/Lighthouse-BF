const fs = require("fs");
const path = require("path");

async function runLighthouse() {
    const chromeLauncher = await import("chrome-launcher");
    const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
    const lighthouseModule = await import("lighthouse");
    const options = {
        logLevel: "info",
        output: "html",
        onlyCategories: ["performance"],
        port: chrome.port,
    };

    const urls = JSON.parse(fs.readFileSync("urls.json", "utf8"));
    const date = new Date();
    const timestamp = `${date.getHours()}-${date.getMinutes()} ${date.getDate()}-${
        date.getMonth() + 1
    }-${date.getFullYear()}`;
    const resultsDir = path.join("results", `${timestamp}`);
    fs.mkdirSync(resultsDir, { recursive: true });

    const results = [];
    let htmlLinks = "";
    for (const url of urls) {
        const runnerResult = await lighthouseModule.default(url, options);

        // `.report` is the HTML report as a string
        const reportHtml = runnerResult.report;
        const filename = `lhreport-${url.replace(/[^a-z0-9]/gi, "_")}.html`;
        fs.writeFileSync(filename, reportHtml);
        fs.renameSync(filename, path.join(resultsDir, filename));

        // `.lhr` is the Lighthouse Result as a JS object
        console.log("Report is done for", runnerResult.lhr.finalDisplayedUrl);
        console.log(
            "Performance score was",
            runnerResult.lhr.categories.performance.score * 100
        );

        results.push(runnerResult.lhr);
        htmlLinks += `<a href="${filename}">${filename}</a><br>`;
    }

    fs.writeFileSync(
        path.join(resultsDir, `results-${timestamp}.json`),
        JSON.stringify(results, null, 2)
    );
    fs.writeFileSync(
        path.join(resultsDir, "index.html"),
        `<html><body>${htmlLinks}</body></html>`
    );

    await chrome.kill();
}

runLighthouse();

"use strict";

const fs = require("fs");

const code = fs.readFileSync("js/portfolio-data.js", "utf8");
const windowObj = {};
Function("window", code)(windowObj);

windowObj.PORTFOLIO_PROJECTS.forEach((project) => {
  project.published = false;
});

const header = `"use strict";

/**
 * Central portfolio data store.
 * Add projects here and place images in image/portfolio/<category>/.
 * See PORTFOLIO_GUIDE.md for the full workflow.
 *
 * Categories:
 * marketplace | advertising | ai-photo | web-design | branding |
 * printing | web-development | bots | automation | mobile
 *
 * projectType: commercial | demo | personal
 */
`;

const output =
  header +
  `window.PORTFOLIO_CATEGORIES = ${JSON.stringify(windowObj.PORTFOLIO_CATEGORIES, null, 2)};\n\n` +
  `window.PORTFOLIO_PROJECTS = ${JSON.stringify(windowObj.PORTFOLIO_PROJECTS, null, 2)};\n`;

fs.writeFileSync("js/portfolio-data.js", output);
console.log(`Unpublished ${windowObj.PORTFOLIO_PROJECTS.length} projects`);

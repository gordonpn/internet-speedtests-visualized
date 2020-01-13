const fs = require('fs');

function getLatestData() {
    try {
        const jsonString = fs.readFileSync('../data.json');
        console.log(`Successfully read data.json at ${Date.now()}`);
        return JSON.parse(jsonString);
    } catch (e) {
        console.log(`Error parsing JSON string: ${e}`);
        return {};
    }
}

module.exports = getLatestData();
const fs = require('fs');

try {
    const jsonString = fs.readFileSync('../data.json');
    module.exports = JSON.parse(jsonString);
} catch (e) {
    console.log(`Error parsing JSON string: ${e}`);
    return
}
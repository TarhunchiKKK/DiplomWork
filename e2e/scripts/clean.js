/*
    This script deletes the directories created by playwright at startup.
*/

const fs = require("fs");
const path = require("path");

const directories = [
    path.join(__dirname, "../playwright-report"),
    path.join(__dirname, "../test-results"),
    path.join(__dirname, "../playwright-tests")
];

for (const directory of directories) {
    if (fs.existsSync(directory)) {
        fs.rm(directory, { recursive: true }, error => {
            if (error) {
                console.error(error);
                return;
            }
        });
    }
}

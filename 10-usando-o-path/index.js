const path = require("node:path");

const dir = "src";
const file = "app.js"

const fullPath = path.join(__dirname, dir, file);
const relativePath = path.join(".", dir, file);
const absolutePath = path.resolve(__dirname, relativePath);
const fileName = path.basename(relativePath);
const ext = path.extname(absolutePath);

console.log(fullPath);
console.log(relativePath);
console.log(absolutePath);
console.log(fileName);
console.log(ext);
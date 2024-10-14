const fs = require("node:fs");

module.exports = function read(path) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([], null, 2))
  }

  return JSON.parse(fs.readFileSync(path).toString());
}

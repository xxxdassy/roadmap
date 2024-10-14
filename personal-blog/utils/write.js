const fs = require("node:fs");

module.exports = function write(path, data) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([], null, 2));
  }

  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

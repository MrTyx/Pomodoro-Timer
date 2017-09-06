const fs = require("fs");
const wav = require("wav");
const Speaker = require("speaker");

module.exports = function() {
  const file = fs.createReadStream("./ding.wav");
  const reader = new wav.Reader();
  reader.on("format", format => {
    reader.pipe(new Speaker(format));
  });
  file.pipe(reader);
};

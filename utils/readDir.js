const fs = require("fs");

// res has to be passed in otherwise it doesn't work
function readDir(directory, res) {
  fs.readdir(directory, (err, files) => {
    //handling error
    if (err) {
      return res.send("Unable to scan directory: ");
    }

    // return all folders for that directory.
    // filtering out anything that includes a dot
    // hopefully avoids hidden folders and files
    const dirFolders = files.map((folder) => folder).filter((folder) => !folder.includes("."));
    return res.send({ directories: dirFolders, path: directory });
  });
}

module.exports = readDir;

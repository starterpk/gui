const fs = require("fs");
const path = require("path");

const currentDir = __dirname; // Users/sunny/code/filesystem
const rootDir = process.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";

fs.readdir(rootDir, (err, files) => {
  //handling error
  if (err) {
    return "Unable to scan directory: ";
  }
  //listing all files
  const dirFiles = files.map((file) => file).filter((file) => file.startsWith("."));
  return dirFiles;
});

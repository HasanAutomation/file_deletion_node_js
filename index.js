const fs = require('fs/promises');
const path = require('path');

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteFileAdvanced(folderPath, fileType, paths = []) {
  try {
    const files = await fs.readdir(folderPath);
    for (const file of files) {
      const actualPath = `${folderPath}\\${file}`;
      if ((await fs.lstat(actualPath)).isDirectory()) {
        deleteFileAdvanced(actualPath, fileType, paths);
      } else {
        if (path.extname(actualPath) === `.${fileType}`) {
          // paths.push(actualPath);
          try {
            // if the file is not accessible then it will throw an exception
            await fs.access(actualPath);
            //Delete the file directly
            await deleteFile(actualPath);
            console.log(`File Deleted : ${actualPath}\n\n\n\n`);
          } catch (err) {
            console.log(`File is not deleted : ${err.message}`);
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

if (!process.argv[2] || !process.argv[3]) {
  console.log('Folder path and file type are required as an argument');
} else {
  deleteFileAdvanced(process.argv[2], process.argv[3]);
}

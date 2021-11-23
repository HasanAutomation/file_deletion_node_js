const fs = require('fs/promises');
const path = require('path');

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.log(err.message);
  }
}

async function goFolderAndDelete(filePath, type) {
  try {
    let totalFiles = 0;
    const files = await fs.readdir(filePath);
    for (const file of files) {
      const actualPath = `${filePath}\\${file}`;
      if (path.extname(actualPath) === `.${type}`) {
        totalFiles++;
        await deleteFile(actualPath);
      }
    }
    return totalFiles;
  } catch (err) {
    console.log(err);
  }
}

async function deleteFilesFromFolder(folderPath, fileType) {
  let TotalFiles = 0;
  try {
    const files = await fs.readdir(folderPath);
    for (const file of files) {
      const actualPath = `${folderPath}\\${file}`;
      if ((await fs.lstat(actualPath)).isDirectory()) {
        TotalFiles =
          TotalFiles + (await goFolderAndDelete(actualPath, fileType));
      } else {
        if (path.extname(actualPath) === `.${fileType}`) {
          TotalFiles++;
          await deleteFile(actualPath);
        }
      }
    }
    console.log(TotalFiles + ' files deleted');
  } catch (err) {
    console.log(err);
  }
}

deleteFilesFromFolder(process.argv[2], process.argv[3]);

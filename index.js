const fs = require('fs/promises');
const { existsSync, readdirSync, lstatSync } = require('fs');
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

async function deleteFileAdvanced(folderPath, fileType, paths = []) {
  try {
    const files = await fs.readdir(folderPath);
    for (const file of files) {
      const actualPath = `${folderPath}\\${file}`;
      if ((await fs.lstat(actualPath)).isDirectory()) {
        deleteFileAdvanced(actualPath, fileType, paths);
      } else {
        if (path.extname(actualPath) === `.${fileType}`) paths.push(actualPath);
      }
    }
    console.log('paths', paths);
    return paths;
  } catch (err) {
    console.log(err);
  }
}

function deleteFileSync(folderPath, fileType, paths = []) {
  try {
    const files = readdirSync(folderPath);
    for (const file of files) {
      const actualPath = `${folderPath}\\${file}`;
      if (lstatSync(actualPath).isDirectory()) {
        deleteFileSync(actualPath, fileType, paths);
      } else {
        if (path.extname(actualPath) === `.${fileType}`) paths.push(actualPath);
      }
    }
    return paths;
  } catch (err) {
    console.log(err);
  }
}

// deleteFilesFromFolder(process.argv[2], process.argv[3]);
// if (!process.argv[2] || !process.argv[3]) {
//   console.log('Folder path and file type are required as an argument');
// } else {
//   deleteFileAdvanced(process.argv[2], process.argv[3])
//     .then(data => {
//       if (data.length === 0)
//         console.log(`No files found of ${process.argv[3]} type`);
//       else {
//         data.forEach(async d => {
//           if (existsSync(d)) await deleteFile(d);
//         });
//         console.log(`${data.length} files deleted`);
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

if (!process.argv[2] || !process.argv[3]) {
  console.log('Folder path and file type are required as an argument');
} else {
  const data = deleteFileSync(process.argv[2], process.argv[3]);
  if (data.length === 0)
    console.log(`No files found of ${process.argv[3]} type`);
  else {
    data.forEach(async d => {
      if (existsSync(d)) await deleteFile(d);
    });
    console.log(`${data.length} files deleted`);
  }
}

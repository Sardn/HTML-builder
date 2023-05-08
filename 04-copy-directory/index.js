
const path = require('node:path');
const fs = require('fs');

const folder = path.resolve(__dirname, 'files');
const copyFolder = path.resolve(__dirname, 'files-copy');

const promis = fs.promises;

async function copyDir() {
    await promis.rm(copyFolder, {
        recursive: true,
    }).catch(() => { });

    await promis.mkdir(copyFolder, {
        recursive: true,
    }).catch(() => { });

    await promis.readdir(folder).then((files) => {
        files.forEach((f) => {
            fs.copyFile(path.join(folder, f), path.join(copyFolder, f), () => { })
        })
    }).catch(() => { })
}


copyDir();
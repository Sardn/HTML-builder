const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist/bundle.css');

fs.readdir(stylesPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    const fileCSS = files.filter(f => path.extname(f.name) === '.css');

    if (!fs.existsSync(path.join(__dirname, 'project-dist'))) {
        fs.mkdirSync(path.join(__dirname, 'project-dist'))
    }
    const strWrite = fs.createWriteStream(distPath);

    fileCSS.forEach((file) => {
        const cssPath = path.join(stylesPath, file.name);
        const strRead = fs.createReadStream(cssPath);
        strRead.on('data', data => strWrite.write(data));
        strRead.on('error', error => process.stdout.write('error', error.message))
    })
})
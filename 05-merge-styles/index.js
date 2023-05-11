// const fs = require('fs');
// const path = require('path');

// const stylesPath = path.join(__dirname, 'styles');
// const distPath = path.join(__dirname, 'project-dist/bundle.css');

// fs.readdir(stylesPath, { withFileTypes: true }, (err, files) => {
//     if (err) throw err;
//     const fileCSS = files.filter(f => path.extname(f.name) === '.css');

//     if (!fs.existsSync(path.join(__dirname, 'project-dist'))) {
//         fs.mkdirSync(path.join(__dirname, 'project-dist'))
//     }
//     const strWrite = fs.createWriteStream(distPath);

//     fileCSS.forEach((file) => {
//         const cssPath = path.join(stylesPath, file.name);
//         const strRead = fs.createReadStream(cssPath);
//         strRead.on('data', data => strWrite.write(data));
//         strRead.on('error', error => process.stdout.write('error', error.message))
//     })
// })
const promis = require('node:fs/promises');
const path = require('path');

const application = async () => {
  try {
    const stylesPath = path.resolve(__dirname,'styles');
    const distPath = path.resolve(__dirname,'project-dist');
    const AbController = new AbortController();
    const { signal } = AbController;

    const files = await promis.readdir(stylesPath, { withFileTypes: true });

    let result = [];

    for (i of files) {
      if (i.isFile() && path.extname(i.name) === '.css') {
        const data = await promis.readFile(path.join(stylesPath, i.name), { encoding: 'utf8' });
        result.push(data);
      }
    }

    await promis.writeFile(path.join(distPath, 'bundle.css'), result.join('\n'), { signal });
  } catch (err) {
    console.error(err.message);
  }
};

application();
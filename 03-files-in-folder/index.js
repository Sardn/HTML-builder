const a = require('fs');
const b = require('path');
const dirPath = b.join(__dirname, 'secret-folder');

a.readdir(dirPath, (err, files) => {
    if (err) throw err;
    files.forEach((f) => {
        const inFale = b.parse(f);
        const pathFile = b.join(dirPath, f);
        a.stat(pathFile, (err, stats) => {
            if (err) throw err;
            if (stats.isFile()) {
                const name = inFale.name;
                const type = inFale.ext.replace('.', '');
                const size = `${Number(stats.size / 1024).toFixed(2)}kb`;
                process.stdout.write(`${name} - ${type} - ${size}\n`);
            }
        })
    })
})


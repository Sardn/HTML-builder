// const { stdin, stdout } = process;

// stdout.write('Как тебя зовут?\n');
// stdin.on('data', data =>{
//     stdout.write('Пивет, ');
//     stdout.write(data);
//     process.exit();
// });
// process.on('exit', () => stdout.write('Удачи!'));

const a = require('fs');
const b = require('path');
const { stdin, stdout } = process;
const streamWrite = a.createWriteStream(b.resolve(__dirname, 'text.txt'))

stdout.write('Enter text here please!\n');

stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        console.log('Best wishes!\n');
        process.exit();
    } else {
        streamWrite.write(data)
    }
});

process.on('SIGINT', () => {
    console.log('Best wishes!\n');
    process.exit();
})


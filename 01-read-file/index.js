const a = require('fs');
const b = require('path');

const readStream  = a.ReadStream(b.resolve(__dirname, 'text.txt'), 'utf8');

readStream.on('data', (c) => {
  console.log(c);
});
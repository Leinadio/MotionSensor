const { spawn } = require('child_process');
const express = require('express');
const app = express();

const vstream = spawn('raspivid', ['-t', '600000', '-o', '-', '-n']);

app.get('/stream', (req, res) => {
  vstream.stdout.pipe(res);
});

app.listen(3000);

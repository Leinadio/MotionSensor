const { spawn } = require('child_process');
const express = require('express');

const router = express.Router();
const vstream = spawn('raspivid', ['-t', '600000', '-o', '-', '-n']);

router.get('/stream', (req, res) => {
  vstream.stdout.pipe(res);
});

module.exports = router;

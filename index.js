const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*.*', (req, res) => {
  res.sendfile(path.join(__dirname, req.url));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);

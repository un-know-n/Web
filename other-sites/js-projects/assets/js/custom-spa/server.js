// Main variables and params
const express = require('express');
const path = require('path');

const app = express();

// Not to rewrite files in 'static' folder
app.use(
  '/static',
  express.static(
    path.resolve('assets', 'js', 'custom-spa', 'frontend', 'static'),
  ),
);

// Redirect user to 'index.html' every time
app.get('/*', (req, res) => {
  res.sendFile(
    path.resolve('assets', 'js', 'custom-spa', 'frontend', 'index.html'),
  );
});

// Start server on port 3000
app.listen(3000, () => console.log('Server is running'));

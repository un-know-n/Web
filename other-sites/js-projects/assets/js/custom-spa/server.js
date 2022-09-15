const express = require('express');
const path = require('path');

const app = express();

app.use(
  '/static',
  express.static(
    path.resolve('assets', 'js', 'custom-spa', 'frontend', 'static')
  )
);

app.get('/*', (req, res) => {
  res.sendFile(
    path.resolve('assets', 'js', 'custom-spa', 'frontend', 'index.html')
  );
});

app.listen(3000, () => console.log('Server is running'));

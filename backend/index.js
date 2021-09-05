const express = require('express');
const app = express();

app.post('/', (req, res) => {
  const name = process.env.NAME || 'World';
  console.log(req.body);
  console.log(typeof (req.body));
  res.send(`Hello ${name}!`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});

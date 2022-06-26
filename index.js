const express = require('express');
const app = express();
const port = 4000;

const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://Hwan:dyghks123@test.mzdnqiy.mongodb.net/?retryWrites=true&w=majority',
    {
      //   useNewUrlParser: true,
      //   useUnifedTopology: true,
    }
  )
  .then(() => console.log('Connect!'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

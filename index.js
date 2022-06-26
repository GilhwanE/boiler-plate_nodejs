const express = require('express');
const app = express();
const port = 4000;

const bodyParser = require('body-parser');
const { User } = require('./models/User');
const config = require('./config/key');

// bodyParser option 부여
// application /x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    //   useNewUrlParser: true,
    //   useUnifedTopology: true,
  })
  .then(() => console.log('Connect!'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 ! ');
});

app.post('/register', (req, res) => {
  // 회원가입시 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true }); // 성공했다는 의미
  }); // monogdb 메서드
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

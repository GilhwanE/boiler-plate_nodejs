const express = require('express');
const app = express();
const port = 5000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/User');
const config = require('./config/key');
const { auth } = require('./middleware/auth');

// bodyParser option 부여
// application /x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
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

app.post('/api/users/register', (req, res) => {
  // 회원가입시 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true }); // 성공했다는 의미
  }); // monogdb 메서드
});

//로그인 확인
app.post('/api/users/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 찾는다.
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다',
      });
    }
    //요청된 이메일이 db에있다면 비밀번호를 비교한다.
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다',
        });
      //비밀번호 일치시, token 생성하기.
      userInfo.getToken((err, userInfo) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에 쿠키? 로컬스토리지?
        res.cookie('x_auth', userInfo.token).status(200).json({
          loginSuccess: true,
          userId: userInfo._id,
        });
      });
    });
  });
});

app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 middleware를 통과해왔다는 이야기는 인증이 참이라는것
  res.status(200).json({
    _id: req.userInfo._id,
    isAdmin: req.userInfo.role === 0 ? false : true,
    isAuth: true,
    email: req.userInfo.email,
    name: req.userInfo.name,
    lastname: req.userInfo.lastname,
    role: req.userInfo.role,
    image: req.userInfo.image,
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.userInfo._id },
    { token: '' },
    (err, userInfo) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

 app.get('/api/hello', (req, res) => {
 res.send('hello');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

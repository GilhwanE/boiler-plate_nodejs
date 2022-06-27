const { json } = require('body-parser');
const { User } = require('../models/User');

let auth = (req, res, next) => {
  // 인증 처리

  // 클라이언트 쿠키에서 토큰을 가져온다
  let token = req.cookies.x_auth;

  // 토큰을 복호화 한후 유저를 찾는다.
  User.findByToken(token, (err, userInfo) => {
    if (err) throw err;
    if (!userInfo)
      return res.json({
        isAuth: false,
        error: true,
      });
    req.token = token;
    req.userInfo = userInfo;
    next(); // middleware에서 이동할 수 있도록
  });

  // 유저가 있으면 인증 ok

  // 유저가 없으면 no
};

module.exports = { auth };

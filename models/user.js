const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // email입력시 space 효과
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre('save', function (next) {
  var user = this;
  // 비밀번호를 암호화 시킨다.

  if (user.isModified('password')) {
    // 비밀번호 수정될때만 실행
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; // plaintextPassword를 hash로 변경하는 과정
        next();
      });
    });
  } else {
    next();
  }
}); // 몽구스의 메서드

const User = mongoose.model('User', userSchema);

module.exports = { User }; // 다른곳에서도 사용할 수 있도록

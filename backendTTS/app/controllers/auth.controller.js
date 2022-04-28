const config = require("../config/auth.config");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = db.user;

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    keyzl : req.body.keyzl,
    password: bcrypt.hashSync(req.body.password, 8),
    
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  
      User.findOne({ name: "user" }, (err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    
  });
};
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "Không tìm thấy tài khoản" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Sai Mật Khẩu"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
    
      res.status(200).send({
        id: user._id,
        username: user.username,
        keyzl: user.keyzl,
        accessToken: token,
        email: user.email
      });
    });
};

exports.update = async (req, res) => {
  const update = { keyzl: req.body.keyzl };
  
  try {
       data = await User.findByIdAndUpdate(req.body.id ,update );
      if(!data) {
          res.status(500).send({ message: data });
          return;
      }
  } catch (error) {
      res.status(500).send({ message: error });
      return;
  }

  return res.send({ message: "Đã Update Thành Công" });

};
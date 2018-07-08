'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _svgCaptchaSmooth = require('svg-captcha-smooth');

var _svgCaptchaSmooth2 = _interopRequireDefault(_svgCaptchaSmooth);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _log4js2.default.getLogger('cheese'); // 图形验证码

var router = _express2.default.Router();
var connection = _mysql2.default.createConnection(_db2.default);

router.get('/captcha', function (req, res) {
  var captcha = _svgCaptchaSmooth2.default.create();

  req.session.captcha = captcha.text;

  res.set('Content-Type', 'image/svg+xml');
  res.send(captcha.data);
});

// 注册
router.post('/register', function (req, res, next) {
  try {
    if (req.session.captcha.toUpperCase() !== req.body.verification_code.toUpperCase()) return next({ message: '验证码错误' });

    req.body.createTime = new Date();
    delete req.body.verification_code;

    connection.query('SELECT mobile FROM user WHERE mobile = ' + req.body.mobile, function (err, result) {
      if (err) next({ message: '查询失败' });else {
        if (result.length) return next({ message: '该账号已注册' });
        connection.query('INSERT INTO user SET ?', req.body, function (err, result) {
          if (err) next({ message: '插入数据失败' });else {
            res.send({ msg: '注册成功' });
          }
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

// 登录
router.post('/user_login', function (req, res, next) {
  try {
    connection.query('SELECT mobile,password,uid FROM user WHERE mobile = ' + req.body.mobile + ' and password = ' + req.body.password, function (err, result) {
      if (err) next({ message: '查询失败' });else {
        if (!result.length) res.status(200).send({ msg: '您还未注册', code: 0 });else {
          req.session.user_id = result[0].uid;
          res.send({ msg: '登录成功', code: 1, user_info: result[0] });
        }
      }
    });
  } catch (err) {
    next(err);
  }
});

exports.default = router;
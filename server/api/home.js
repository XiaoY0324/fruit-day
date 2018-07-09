import express from 'express';
import mysql from 'mysql';
import dbConfig from '../db';
import svgCaptcha from 'svg-captcha-smooth'; // 图形验证码
import log4js from 'log4js';

const logger = log4js.getLogger('cheese');
const router = express.Router();
const connection = mysql.createConnection(dbConfig);

router.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create();

  req.session.captcha = captcha.text;

  res.set('Content-Type', 'image/svg+xml');
  res.send(captcha.data);
});

// 注册
router.post('/register', (req, res, next) => {
  try {
    if(req.session.captcha.toUpperCase() !== req.body.verification_code.toUpperCase()) return next({ message: '验证码错误' });

    req.body.createTime = new Date();
    delete req.body.verification_code;

    connection.query(`SELECT mobile FROM user WHERE mobile = '{ req.body.mobile }'`, (err, result) => {
      if (err) next({ message: '查询失败' });
      else {
        if (result.length) return next({ message: '该账号已注册' });
        connection.query('INSERT INTO user SET ?', req.body, (err, result) => {
          if (err) next({ message: '插入数据失败' });
          else {
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
router.post('/user_login', (req, res, next) => {
  try {
    connection.query(`SELECT mobile,password,uid FROM user WHERE mobile = '${ req.body.mobile }'' and password = '${ req.body.password }'`, (err, result) => {
      if (err) next({ message: '查询失败' });
      else {
        if (!result.length) res.status(200).send({ msg: '您还未注册', code: 0 });
          else {
            req.session.user_id = result[0].uid;
            res.send({ msg: '登录成功', code: 1, user_info: result[0] });
          }
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;




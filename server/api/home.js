import express from 'express';
import mysql from 'mysql';
import dbConfig from '../db';
import svgCaptcha from 'svg-captcha-smooth'; // 图形验证码

// const captcha = svgCaptcha.create(); // 创建svg data2
const router = express.Router();
const connection = mysql.createConnection(dbConfig);

router.get('/user/', (req, res, next) => {
  try {
    connection.query('INSERT INTO table_basic SET ?', { selectedChannel: '223' }, (err, result) => {
      if (err) console.log('插入数据失败', err);
      else {
        console.log(result);

        res.send({ data: result });
        connection.end();
      }
    });
  } catch (err) {
    console.info(err);
    res.status(500).send(err.stack);
  }
});

router.get('/captcha', (req, res) => {
  console.log('wowowow');
  const captcha = svgCaptcha.create();

  req.session.captcha = captcha.text;
  console.log(req.session.captcha, '---------------------------------');

  res.set('Content-Type', 'image/svg+xml');
  res.send(captcha.data);
});

export default router;




import express from 'express';
import mysql from 'mysql';
import dbConfig from '../db';
import log4js from 'log4js';

const logger = log4js.getLogger('cheese');
const router = express.Router();
const connection = mysql.createConnection(dbConfig);

// 首页商品信息
router.get('/goods_list', (req, res, next) => {
  try {
    connection.query(`SELECT * FROM goods`, (err, result) => {
      if (err) next({ message: '查询失败' });
      else {
        if (!result.length) next({ message: '没有商品' });
          else {
            logger.info(result);
            res.send({ goods: result, status: 'success' });
          }
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;

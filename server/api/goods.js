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
      if (err) next(err);
      else {
        if (!result.length) next({ message: '没有商品' });
          else {
            // logger.info(result);
            res.send({ goods: result, status: 'success' });
          }
      }
    });
  } catch (err) {
    next(err);
  }
});

// 商品详情信息
router.get('/goods_detail', (req, res, next) => {
  try {
    if (req.query.goodId == 0) return next(err);

    connection.query(`SELECT * FROM goods where goodsId = ${ req.query.goodId }`, (err, result) => {
      if (err) next(err);
      else {
        if (!result.length) next({ message: '没有商品' });
          else {
            res.send({ result: result[0], status: 'success' });
          }
      }
    });
    console.log(req.query);
  } catch (err) {
    next(err);
  }
});

// 加入购物车
router.post('/add_cart', (req, res, next) => {
  try {
    console.log(req.body);
    connection.query(`SELECT * FROM cart WHERE goodsId = ${ req.body.goodsId }`, (err, result) => {
      if (err) next({ message: '查询失败' });
      else {
        if (result.length) {
          logger.info('执行修改操作');
          connection.query(`UPDATE cart SET goodsCnt = ${ result[0].goodsCnt + 1 } WHERE goodsId = ${ req.body.goodsId }`);
            if (err) next({ message: '修改数据失败' });
            else {
              res.send({ msg: '加入购物车成功', code: 2 });
            }
        } else {
          logger.info('执行插入操作');
          connection.query('INSERT INTO cart SET ?', req.body, (err, result2) => {
            if (err) next({ message: '插入数据失败' });
            else {
              res.send({ msg: '加入购物车成功', code: 1 });
            }
          });
        }
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;

import express from 'express';
import mysql from 'mysql';
import dbConfig from '../db';
import log4js from 'log4js';

const logger = log4js.getLogger('cheese');
const router = express.Router();
const connection = mysql.createConnection(dbConfig);

// 首页商品信息
router.get('/goods_list', (req, res, next) => {
  console.log(req.query);
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

    connection.query(`SELECT * FROM goods where goodsId = "${ req.query.goodId }"`, (err, result) => {
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
    connection.query(`SELECT * FROM cart WHERE goodsId = '${ req.body.goodsId }'`, (err, result) => {
      if (err) next({ message: '查询失败' });
      else {
        if (result.length) {
          logger.info('执行修改操作');
          connection.query(`UPDATE cart SET goodsCnt = ${ result[0].goodsCnt + req.body.goodsCnt } WHERE goodsId = "${ req.body.goodsId }"`);
            if (err) next({ message: '修改数据失败' });
            else {
              res.send({ msg: '加入购物车成功', code: 2 });
            }
        } else {
          logger.info('执行插入操作');
          connection.query('INSERT INTO cart SET ?', req.body, (err, result2) => {
            if (err) next(err);
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

// 根据uid 取购物车内商品信息
router.get('/cart_list', (req, res, next) => {
  try {
    if (!req.query.uid) return next({ message: '用户不存在' });

    connection.query(`SELECT goods.goodsName, goods.goodsImg, goods.goodsId, goods.price, goods.goodsUnit, goods.old_price, cart.goodsCnt FROM goods, cart WHERE cart.goodsId=goods.goodsId and cart.userId='${ req.query.uid }'`, (err, result) => {
      if (err) next(err);
      else {
        res.send({ result: result, status: 'success' });
      }
    });

  } catch (err) {
    next(err);
  }
});

// 删除购物车中某商品
// 根据uid 取购物车内商品信息
router.delete('/cart_list', (req, res, next) => {
  try {
    if (!req.query.uid) return next({ message: '用户不存在' });

    connection.query(`DELETE FROM cart WHERE goodsId = '${ req.query.goods_id }' and cart.userId = '${ req.query.uid }'`, (err, result) => {
      if (err) next(err);
      else {
        res.send({ status: 'success' });
      }
    });

  } catch (err) {
    next(err);
  }
});

// 创建订单信息
router.post('/create_order', (req, res, next) => {
  try {
    connection.query('INSERT INTO wst_orders SET ?', req.body, (err, result) => {
      if (err) next({ message: '插入数据失败' });
      else {
        // 生成订单后清空当前用户购物车
        connection.query(`DELETE FROM cart WHERE cart.userId = '${ req.body.uid }'`, (err, result) => {
          if (err) next(err);
          else {
            res.send({ msg: '生成订单成功', code: 1 });
          }
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;

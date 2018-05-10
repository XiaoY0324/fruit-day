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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var connection = _mysql2.default.createConnection(_db2.default);

router.get('/user/', function (req, res, next) {
  res.status(200).send({
    msg: 'ok'
  });
  // try {
  //   connection.connect(err => {
  //     if (err) {
  //       console.log('与MySQL数据库建立连接失败');
  //       res.status(500).send({
  //         result: `与MySQL数据库建立连接失败, ${ err.stack }`
  //       });
  //     }
  //     else {
  //       connection.query('INSERT INTO table_basic SET ?', { selectedChannel: '223' }, (err, result) => {
  //         if (err) console.log('插入数据失败', err);
  //         else {
  //           console.log(result);

  //           res.send({ data: result });
  //           connection.end();
  //         }
  //       });
  //     }
  //   });
  // } catch (err) {
  //   console.info(err);
  //   res.status(500).send(err.stack);
  // }
});

exports.default = router;
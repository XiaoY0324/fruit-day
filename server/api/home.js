import express from 'express';
import mysql from 'mysql';
import dbConfig from '../db';


const router = express.Router();
const connection = mysql.createConnection(dbConfig);

router.get('/user/', (req, res, next) => {
  res.status(200).send({
    msg: `ok`
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

export default router;




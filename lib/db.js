'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dbConfig = {
  host: '39.106.53.245',
  port: 3306,
  database: 'ng5_database',
  user: 'ys',
  password: '123456',
  useConnectionPooling: true // 服务器上连接 mysql时报错 Error: Cannot enqueue Query after fatal error
};

exports.default = dbConfig;
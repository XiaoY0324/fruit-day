import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
// import sessionFileStore from 'session-file-store';  // 储存在session file
import moment from 'moment';
import log4js from 'log4js';
// const FileStore = sessionFileStore(session);
import redis from 'redis';
import connectRedis from 'connect-redis';

import homeApi from './api/home';
import goodsApi from './api/goods';

const RedisStore = connectRedis(session); // 储存在redis里
// 创建Redis客户端
const redisClient = redis.createClient(6379, '127.0.0.1', { info: 'captcha' });
const app = express();
const router = Router();
const logger = log4js.getLogger('cheese');

log4js.configure('config/log4js.json');
logger.trace('trace');
logger.debug('trace');
logger.info('info');
logger.warn('warn');
logger.error('error');
logger.fatal('fatal');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ // 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
  name: 'sid',
  secret: 'captcha',
  cookie: { maxAge: 60 * 1000 * 60 * 12 },
  store: new RedisStore({ client: redisClient }),
  // store: new FileStore(),
  saveUninitialized: true, // 初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
  resave: false // (是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
}));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header('Access-Control-Allow-Credentials', true);
  // if (req.method == "OPTIONS") res.send(200);/* 让options请求快速返回 */
  next();
})

app.use('/aws/home/', homeApi);
app.use('/aws/goods/', goodsApi);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  logger.warn(err);
  const locals = Object.assign({ message: err.message });

  if (err.status === 500 && err.text) {
    return res.send(err.text);
  }

  if (/application\/json/.test(req.get('accept'))) {
    res.json(locals);
  } else {
    res.send(err.message);
  }
  logger.error(err);
});

app.listen(8989, () => {
  logger.info('server listening at port 8989...');
});

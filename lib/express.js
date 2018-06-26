'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _home = require('./api/home');

var _home2 = _interopRequireDefault(_home);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _connectRedis = require('connect-redis');

var _connectRedis2 = _interopRequireDefault(_connectRedis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const FileStore = sessionFileStore(session);

// import sessionFileStore from 'session-file-store';  // 储存在session file
var RedisStore = (0, _connectRedis2.default)(_expressSession2.default); // 储存在redis里
// 创建Redis客户端
var redisClient = _redis2.default.createClient(6379, '127.0.0.1', { info: 'captcha' });
var app = (0, _express2.default)();
var router = (0, _express.Router)();
var logger = _log4js2.default.getLogger('cheese');

_log4js2.default.configure('config/log4js.json');
logger.trace('trace');
logger.debug('trace');
logger.info('info');
logger.warn('warn');
logger.error('error');
logger.fatal('fatal');

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)({ // 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
  name: 'sid',
  secret: 'captcha',
  cookie: { maxAge: 60 * 1000 * 60 * 12 },
  store: new RedisStore({ client: redisClient }),
  // store: new FileStore(),
  saveUninitialized: true, // 初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
  resave: false // (是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
}));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header('Access-Control-Allow-Credentials', true);
  // if (req.method == "OPTIONS") res.send(200);/* 让options请求快速返回 */
  next();
});

app.use('/aws/home/', _home2.default);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  logger.warn(err);
  var locals = Object.assign({ message: err.message });

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

app.listen(8989, function () {
  logger.info('server listening at port 8989...');
});
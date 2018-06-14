import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import homeApi from './api/home';
import session from 'express-session';

const app = express();
const router = Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ // 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
  secret: 'good boys',
  cookie: { maxAge: 60 * 1000 }
}));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method == "OPTIONS") res.send(200);/* 让options请求快速返回 */
    else next();
})

app.use('/aws/home/', homeApi);

app.listen(8989, () => {
  console.log('server listening at port 8989...');
});

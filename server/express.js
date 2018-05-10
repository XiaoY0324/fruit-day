import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import homeApi from './api/home';
console.log(process.env.NODE_ENV);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method == "OPTIONS") res.send(200);/* 让options请求快速返回 */
    else  next();
})

app.use('/home/', homeApi);

app.listen(8000, () => {
  console.log('server listening at port 8000...');
});

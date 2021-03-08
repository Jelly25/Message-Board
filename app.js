// 引包
var express = require('express');
var fs = require('fs');
var template = require('art-template');

// 创建一个存储用户留言的数组
var arr = [
  {
    name: '开发者',
    msg: '快来发布留言吧',
    time: '2021-3-8 00:00:00'
  }
]

// 创建服务器
var app = express();

// 开放public目录
app.use('/public/', express.static('./public'));

// 请求/ 为index.html
app.get('/', function (req, res) {
  fs.readFile('views/index.html', function (err, data) {
    if (err) {
      return res.send('404 Not Found');
    }
    data = template.render(data.toString(), {
      arr: arr
    });
    res.send(data);
  })
})
// 请求/post 为post.html
app.get('/post', function (req, res) {
  fs.readFile('views/post.html', function (err, data) {
    if (err) {
      return res.send('404 Not Found');
    }
    res.send(data);
  })
})
// 请求/comment 重定向为index.html
app.get('/comment', function (req, res) {
  req.query.time = '2021-3-8 12:00:00';
  arr.unshift(req.query);
  // 页面重定向
  res.statusCode = 302;
  res.setHeader('location', '/');
  res.send();
})

// 设置端口号
app.listen(3000, function () {
  console.log('server is running at port 3000...');
})
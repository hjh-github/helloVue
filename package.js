
var http = require('http');
var fs = require('fs');//引入文件读取模块

var documentRoot = 'C:/Users/47100/Desktop/web';//需要访问的本地文件的存放目录

var server = http.createServer(function (req, res) {

    var url = req.url;
    var file = documentRoot + url;

    fs.readFile(file, function (err, data) {
        if (err) {
            res.writeHeader(404, { 'content-type': 'text/html;charset="utf-8"' });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        } else {
            if (url.indexOf("css") ==1 ) {
                res.writeHeader(200, { 'content-type': 'text/css' });
                res.write(data);
                res.end();
            }else{
                // res.writeHeader(200, { 'content-type': 'text/html;charset="utf-8"' });
                // res.write(data);
                // res.end();
            }
            
        }
    });
}).listen(8889);// 此处的8889是监听的端口号,可以根据自己的需要配置,注意不要和本地的一些应用程序使用的端口号冲突

console.log('http://localhost:8889/index.html');
// node package.js
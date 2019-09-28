# get-cookie-in-chrome
get-cookie-in-chrome

![图片](https://github.com/spademan/get-cookie-in-chrome/blob/master/1569660226187.jpg)

### 参数说明

##### 1.`url`: 接受cookie的接口

##### 2.轮询间隔：隔多久会触发一次自动发送（需要轮询模式才行）

##### 3.网站根域名：如果只想接受某个网站的，可以设置根域名，底层配置是通过是否含有根域名`indexof`的方式判断的

#### 4.额外参数：除了默认的cookie参数之外可以增加其他参数，但是格式必须是

```
// good
{"a":"xxx"} // 标准的json

// bad

{a: 'x'}
{a: "x"}
{"a": 'x'}

```

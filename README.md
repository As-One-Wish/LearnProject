## password_manage_server

### 数据结构

- InfoItem

|   字段名   |      类型       |          说明          |
| :--------: | :-------------: | :--------------------: |
|     Id     |      long       |       信息ID标识       |
|    tab     | required string |        信息标签        |
| isPassword |      bool       | 信息类型 T-密码 F-一般 |
|  content   | required string |        信息内容        |
|  account   |     string?     |      isPassword=T      |
|  comment   |     string?     |                        |



### 接口说明

#### 1、添加单条信息

**url:**`api/info/addInfo`

**参数:**`[FromBody] InfoItem info`

**返回：**

**说明:**接收前端传递数据，将其加密后保存在本机文件中；

#### 2、获取所有信息


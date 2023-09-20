## password_manage_server

### 数据结构

- InfoItem

|   字段名   |      类型       |          说明          |
| :--------: | :-------------: | :--------------------: |
|     Id     |      long       |       信息ID标识       |
|    name    | required string |        信息名称        |
| isPassword |      bool       | 信息类型 T-密码 F-一般 |
|  content   | required string |        信息内容        |
|  account   |     string?     |  isPassword=T时 账号   |
|  comment   |     string?     |          备注          |

### 接口说明

#### 1、添加单条信息




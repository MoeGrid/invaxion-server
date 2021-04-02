# 音灵第三方服务端

目前还是半成品, 无法使用

#### 目录&文件简介

```
src
    gate    游戏消息处理
    login   登陆消息处理
    proto   proto文件
    server  封包处理流水线
    utils   一些工具
tools
    decode-proto.js protobuf数据反序列化工具
```

#### 部署

```shell
# 准备项目
git clone https://github.com/603185423/invaxion-server.git
cd invaxion-server
yarn
# 准备PM2
yarn global add pm2
pm2 install pm2-intercom
pm2 install pm2-logrotate
pm2 set pm2-logrotate:retain 0
# 启动
pm2 start INVAXION_SERVER.json
```

#### 维护

```shell
# 查看状态
pm2 list
# 停止
pm2 stop INVAXION_SERVER
# 停止
pm2 start INVAXION_SERVER
# 停止
pm2 restart INVAXION_SERVER
```

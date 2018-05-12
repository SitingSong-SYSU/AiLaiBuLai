# AiLaiBuLai


## 登录

+ request 
  ```
  post

  {
    "stduent_id":"15331117",
    ""
  }

  ```

拍摄个人照片 关联学号 【本人照片，学号，姓名，微信号，学校】



- 发布签到 名称+时间+地点+签到id 【名称+地址信息：经纬度】【分享签到id】
- 参与签到 拍摄个人照片+备注信息 【照片+签到id+gps】服务器调用api 比对本次照片与初始照片 
- 查找签到活动 通过签到id或分享链接 【根据签到id查找】
- 历史发布签到【微信号】
- 具体每个签到信息【签到id】

post imgae/jpg
post gps + string

post json {
  base64
}
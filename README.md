# AiLaiBuLai

### 登陆

+ request

POST /users/session

  + header

    Token:xxxxxx

  + body

    ```
      {
        "code":"xxxxx"
      }
    ```

+ response

  201 OK

  + header

    Token:xxxxxx


### 提交个人信息

+ request 

  POST /users

  + header

    Token:xxxxxx

  + body

    ```
      {
        "id": "15331117",
        "name": "王小明",
        "school": "中山大学"
      }
    ```

+ response

  201 OK

### 上传个人照片

+ request 

  POST /users/picture

  + header

    Token:xxxxxx

  + body

    image/png等图片

+ response

    201 OK


### 发布签到 

+ request 

  POST /checkin

  + header

    Token:xxxxxx

  + body

    [经度纬度](https://developers.weixin.qq.com/miniprogram/dev/api/location.html#wxchooselocationobject)名称和签到时长(分钟)

    ```
      {
        "latitude": 124.2232,
        "longitude": 232.3232,
        "title": "软测b403",
        "limit_time": 15
      }
    ```

+ response

    201 OK

    返回一个分享签到的密码

    ```
    {
      "share_id":"4618"
    }
    ```

### 参与签到 

+ request 

  POST /share_checkin/{share_id}?latitude=322.1&longitude=2332.32&msg=xxxx

  + header

    Token:xxxxxx

  + body

    image/png

+ response

  + 200

    ```
    {
      "msg":"签到成功"
    }
    ```
  + 401

    ```
    {
      "msg":"签到失败/没有该签到活动/位置过远无法说签到/照片匹配失败"
    }
    ```

### 查看签到活动的名称

+ request 

  GET /share_checkin/{share_id}

  + header

  Token:xxxxxx

+ response

  OK 200

  ```
  {
    "title":"软测b302"
  }
  ```

  401

  ```
  {
    "msg":"该签到活动b不存在"
  }
  ```

### 历史发布签到列表

+ request

  GET /checkin

  + header

    Token:xxxxxx

  + body

    ```
      {
        "checkin_history":[
          {
              "title":"软测b304",
              "checkin_id":"bhjinkl",
              "datetime":"2018-01-03 11:12:23",
              "checkedin_num":80
          },
          {
              "title":"系分b209",
              "checkin_id":"431bjjnk"
              "datetime":"2018-01-23 14:12:23",
              "checkedin_num":75
          }
        ]
      }
    ```

### 点击结束签到

DELETE /checkin/{checkin_id}

+ request

    Token:xxxxxx

  + body

    204 成功结束

    401 
    ```
    {
      "msg":"结束签到失败"
    }
    ```


### 具体每个签到信息

GET /checkin/{checkin_id}

+ reuqest
    Token:xxxxxx

  + body

    200

    ```
    {
      "title":"软测b403"
      "checkedin":[
          {
              "id":"15331689",
              "name":"王同学",
              "university": "中山大学",
              "msg": "备注信息"
          },
          {
              "id":"15457682",
              "name":"李同学",
              "university": "中山大学",
              "msg": "备注信息"                         
          }
      ],
      "checkedin_num":75,
      "datetime":"xxxxxx",
      "is_on": false,
      "share_id": -1
    }
    ```

    401 
    ```
    {
      "msg":"不存在该签到信息"
    }
    ```
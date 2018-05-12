export const CONF = {
    port: '8008',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxe069701a8822d1f2',

    // 微信小程序 App Secret
    appSecret: '2b98f3e1dd304bad85dad710d6213332',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        pass: 'ugnamsung@1117',
        database: 'checkInManager'
    },

    logFilePath: './checkin.log',

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}


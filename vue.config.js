module.exports = {
    devServer: {
        proxy: { // 配置跨域
            '/v1': {
                target: 'http://121.36.94.53:100',
                changOrigin: true
            }
        }
    }
}

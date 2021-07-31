module.exports = {
    "dev-test": {
        proxyTable: {
            '/api': {
                target: 'http://192.168.0.220:9000',
                //target: 'http://120.24.152.22:9000',
                //target: 'http://192.168.0.220:9000/',
                // target:'http://qq364525897.e2.luyouxia.net:32232',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            },
            '/assets': {
                target: 'http://183.62.39.2:9000/',
                changeOrigin: true
            }
        },
        port: 8089,
        // disableHostCheck:true,
        // host: '0.0.0.0',
        message: 'Now Proxy in 220(test); You application is running here http://localhost:8089'
    },
    "dev-222": {
        proxyTable: {
            '/api': {
                target: 'http://192.168.10.64:9000',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
        },
        port: 9998,
        message: 'Now Proxy in 222(yjg); You application is running here http://localhost:9998'
    },
    "dev-224": {
        proxyTable: {
            '/api': {
                target: 'http://192.168.0.224:9000',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
        },
        port: 9999,
        message: 'Now Proxy in 224(yrl); You application is running here http://localhost:9999'
    },
    "dev-225": {
        proxyTable: {
            '/api': {
                target: 'http://192.168.2.89:9000',
                // target: 'http://toutou.zgcfo.com:9000',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
        },
        port: 9999,
        message: 'Now Proxy in 225(yrl); You application is running here http://localhost:9999'
    },
    "dev-cloud": {
        proxyTable: {
            '/api': {
                target: 'http://cloud.zgcfo.com/api/',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
        },
        port: 10001,
        message: '[[[warning]]] Now Proxy in cloud(production); You application is running here http://localhost:10000; 请不要进行无关操作！'
    },
    "dev-local": {
        proxyTable: {
            '/api': {
                target: 'http://192.168.10.64:9000',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
        },
        port: 8088,
        message: 'Now Proxy in 127.0.0.1(local); You application is running here http://localhost:8088'
    },
    "dev-w3": {
        proxyTable: {
            '/api': {
                target: 'http://litooth.w3.luyouxia.net',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
        },
        port: 10002,
        message: 'Now Proxy in w3; You application is running here http://localhost:10002'
    }
}
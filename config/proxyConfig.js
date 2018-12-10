module.exports = {
    proxy: {
          '/': {    
//            target: 'http://xatzht.sxxat.com',	//正式环境接口地址
//            target: 'http://120.55.54.192:8080',	//测试环境接口地址
              target:'/',
              changeOrigin: false,  //是否跨域
              pathRewrite: {
                  '^/xat': ''   //需要rewrite的,
              }
          }
    }
  }
/* http://xatzht.sxxat.com */

module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
          alias: {
            'assets': '@/assets',        
            'aip': '@/api',        
            'common': '@/common',
            'components': '@/components',
            'network': '@/network',
            'view': '@/view',
          }
        }
      }
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
}
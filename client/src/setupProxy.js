const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    const options = {
        target: 'http://quink-post.herokuapp.com', 
        changeOrigin: true,
        ws: true,
        router: {
          'dev.localhost:3000': 'http://localhost:5000',
        },
      };

    app.use(
        '/api',
        createProxyMiddleware(options)
    );
};
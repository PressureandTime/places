const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://storage.googleapis.com/coding-session-rest-api',
      changeOrigin: true,
    })
  );
};

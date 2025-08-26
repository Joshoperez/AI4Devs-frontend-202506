console.log('🔧 PROXY: File loaded at top level');

const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('🔧 PROXY: http-proxy-middleware imported');

function setupProxy(app) {
  console.log('🔧 PROXY: Function called with app:', !!app);
  
  app.use('/positions', createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true
  }));
  
  app.use('/candidates', createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true
  }));
  
  console.log('🔧 PROXY: Setup complete');
}

module.exports = setupProxy;

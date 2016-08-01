require.config({
  baseUrl: 'scripts/js/',
  shim: {
    jquery: {
      exports: '$'
    }
  },
  paths: {
    'jquery' : '../../node_modules/jquery/dist/jquery.min'
  }
});


require(['jquery', 'app' ], ($, app) => {
  app.run();
});
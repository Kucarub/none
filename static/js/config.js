;(function() {
  var config = {
    DEV: {
      BASE_URL_MAP: {
        DEFAULT: 'http://127.0.0.1:3000/',
      }
    },
    PROD: {
      BASE_URL_MAP: {
        DEFAULT: 'http://127.0.0.1:3000/',
      }
    }
  }
  var g = typeof window ? window : global
  g.NT_CONFIG = config
})();

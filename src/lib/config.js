module.exports = {
  SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY',
  backend: {
    hapiRemote: false,
    hapiLocal: true
  },
  HAPI: {
    local: {
      url: 'http://192.168.1.7:5000'
    },
    remote: {
      url: 'https://snowflakeserver-bartonhammond.rhcloud.com/'
    }
  }
}

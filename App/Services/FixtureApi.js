export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  },
  login: (username, password) => {
    if (username == password) {
      return {
        ok: true,
        data: {
          username: 'aaaaa',
          token: 'bbbbbb'
        }
      }
    }

  },
  getCaptcha: () => {
    return {
      'hash1': 549,
      'hash2': 549,
      'url': '/site/captcha?v=59717da259243'
    }
  }
}

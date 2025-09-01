const app = require('../backend/dist/index.js').default;

module.exports = async (req, res) => {
  return app(req, res);
};
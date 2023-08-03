// ./src/api/contact/services/recaptcha.js

const axios = require("axios");

module.exports = {
  async validate(token) {
    try {
      const response = await axios.get(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          params: {
            secret:
              process.env.RECAPTCHA_SECRET ||
              "6Ld0QeYmAAAAAJUscqYagXnXV6TsxF__R27FyVK4",
            response: token,
          },
        }
      );

      const { success, score } = response.data;
      return {
        valid: success,
        score: score,
      };
    } catch (err) {
      strapi.log.error(err);
      return {
        valid: false,
        score: 0,
      };
    }
  },
};

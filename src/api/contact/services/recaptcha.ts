// ./src/api/contact/services/recaptcha.js
import axios from "axios";

export default {
  async validate(token) {
    try {
      const response = await axios.get(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          params: {
            secret:
              process.env.RECAPTCHA_SECRET,
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

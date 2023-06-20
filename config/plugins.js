module.exports = ({ env }) => ({
  ezforms: {
    config: {
      captchaProvider: {
        name: "recaptcha",
        config: {
          secretKey: "6LdwrIEmAAAAAGibSq-Tm22nTZOjxbc1NC9AhfgW",
          minimumScore: 0.5,
        },
      },
      notificationProviders: [],
    },
  },
});

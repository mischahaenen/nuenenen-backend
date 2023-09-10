export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("AWS_ACCESS_SECRET"),
        region: env("AWS_REGION"),
        params: {
          ACL: env("AWS_ACL", "public-read"),
          Bucket: env("AWS_BUCKET"),
        },
      },
    },
  },
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "uvex@pfadi-nuenenen.ch",
        defaultReplyTo: "uvex@pfadi-nuenenen.ch",
      },
    },
  },
});

export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
        providerOptions: {
        baseUrl: env('CDN_URL'),
        rootPath: env('CDN_ROOT_PATH'),
        s3Options: {
          credentials: {
            accessKeyId: env("AWS_ACCESS_KEY_ID"),
            secretAccessKey: env("AWS_ACCESS_SECRET"),
          },
          region: env("AWS_REGION"),
          params: {
            ACL: env("AWS_ACL", "public-read"),
            Bucket: env("AWS_BUCKET"),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: 'amazon-ses',
      providerOptions: {
        key: env('AWS_SES_KEY'),
        secret: env('AWS_SES_SECRET'),
        amazon: 'https://email.eu-central-1.amazonaws.com',
        region: 'eu-central-1',
      },
      settings: {
        defaultFrom: "hallo@pfadi-nuenenen.ch",
        defaultReplyTo: "hallo@pfadi-nuenenen.ch",
      },
    },
  },
});

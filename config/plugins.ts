export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
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
  },
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "hallo@pfadi-nuenenen.ch",
        defaultReplyTo: "hallo@pfadi-nuenenen.ch",
      },
    },
  },
  "strapi-plugin-populate-deep": {
    config: {
      defaultDepth: 5,
    },
  },
  'strapi-plugin-sso': {
    enabled: true,
    config: {
      // OpenID Connect
      OIDC_CLIENT_ID: 'Aa-k4SVIpHWrPQvZQCseh4lDYlrxE1FbYtT4RIWjh44',
      OIDC_CLIENT_SECRET: 'RrwEp7WbZVqkF2Cl3eLl96GEe2xKkMDUSut2hBcYrKY',

      OIDC_SCOPES: 'openid email name', // https://oauth.net/2/scope/
      // API Endpoints required for OIDC
      OIDC_AUTHORIZATION_ENDPOINT: 'https://pbs.puzzle.ch/oauth/authorize',
      OIDC_TOKEN_ENDPOINT: 'https://pbs.puzzle.ch/oauth/token',
      OIDC_USER_INFO_ENDPOINT: 'https://pbs.puzzle.ch/oauth/userinfo',
      OIDC_USER_INFO_ENDPOINT_WITH_AUTH_HEADER: false,
      OIDC_GRANT_TYPE: 'authorization_code', // https://oauth.net/2/grant-types/
      // customizable username arguments
      OIDC_FAMILY_NAME_FIELD: 'last_name',
      OIDC_GIVEN_NAME_FIELD: 'first_name',
    }
  }
});

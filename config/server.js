module.exports = ({ env }) => ({
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 3000,
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
});

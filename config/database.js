module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        uri: process.env.MONGODB_URI,
      },
      options: {
        ssl: true,
      },
    },
  },
});
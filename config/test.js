const config = {
  env: 'test',
  defaultTimezone: 'Europe/Brussels',
  country: 'BE',
  port: process.env.PORT || 3000,
  mongo: process.env.MONGO,
  services: {
    weather: {
      ttl: 86400,
      extra: {
        unit: 'c',
        city: 'brussels',
      },
    },
  },
};

module.exports = config;

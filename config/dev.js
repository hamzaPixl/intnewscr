const config = {
  env: 'dev',
  defaultTimezone: 'Europe/Brussels',
  country: 'BE',
  port: process.env.PORT || 3000,
  mongo: process.env.MONGO,
  services: {
    weather: {
      stub: false,
      ttl: 86400,
      extras: {
        unit: 'c',
        city: 'brussels',
      },
    },
    news: {
      stub: false,
      ttl: 86400,
      extras: {
        sources: ['rtl'],
      },
    },
  },
};

module.exports = config;

const config = {
  env: 'test',
  defaultTimezone: 'Europe/Brussels',
  country: 'BE',
  port: process.env.PORT || 3000,
  mongo: process.env.MONGO,
  server: {
    http: 'http://localhost:3000',
  },
  services: {
    admin: {
      stub: true,
    },
    weather: {
      stub: true,
      ttl: 86400,
      extras: {
        unit: 'c',
        city: 'brussels',
      },
    },
    news: {
      stub: true,
      ttl: 86400,
      extras: {
        sources: ['rtl'],
      },
    },
  },
};

module.exports = config;

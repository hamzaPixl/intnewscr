const config = {
  env: 'dev',
  defaultTimezone: 'Europe/Brussels',
  country: 'BE',
  pageSize: 50,
  port: process.env.PORT || 3000,
  mongo: process.env.MONGO,
  secret: process.env.SECRET,
  server: {
    http: 'http://localhost:3000',
  },
  services: {
    admin: {
      stub: false,
    },
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

const Weather = require('../models/Weather');

function createFromPayload(payload) {
  if (!payload) {
    return null;
  }

  return new Weather({
    astronomy: payload.astronomy,
    location: payload.location,
    units: payload.units,
    wind: payload.wind,
    code: payload.code,
    date: payload.date,
    day: payload.day,
    high: payload.high,
    low: payload.low,
    text: payload.text,
  });
}

module.exports = {
  createFromPayload,
};

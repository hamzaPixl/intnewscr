const scrappIndiceDefault = 1;
const scrappIndiceBeaulieu = 3;
const line17 = '17';
const line95 = '95';
const line94 = '94';

/**
 * This constructor use params to be able to call api
 * @param config is the array object that contains all value as variable, url ..
 * @param services is used to require services that the module need
 */
function Buisness (services, config) {
  this.services = services;
  this.config = config;
  Object.keys(this.services).map((serviceKey) => {
    this[serviceKey] = require(this.services[serviceKey].name);
    return this;
  });
}

Buisness.prototype = {
  /**
   * This function scrapp the HTML code to exports data
   * @param url is the link to retreive data
   * @param indice is the indice of childeren for the result
   * @param line is the STIB line
   * @param destination is the destination of the line
   * @private
   * @return  the promis that contains data
   */
  scrapping: function scrapping (url, indice, line, destination) {
    return new Promise((resolve, reject) => {
      this.request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const $ = this.cheerio.load(body);
          const ul = $('#realtime_view').children();
          resolve([{
            destination,
            model: 'stib',
            indice: line,
            line: ul[ul.length - indice].children[0].children[1].children[0].data,
          }, {
            destination,
            model: 'stib',
            indice: line,
            line: ul[ul.length - indice].children[1].children[1].children[0].data,
          }]);
        } else {
          reject(error);
        }
      });
    });
  },

  /**
   * This function give the information about
   * the time of the differents STIB line around EMAKINA
   * @line is the STIB's Line
   * @return a Promise that contains data
   */
  getLine: function getLine (line) {
    let result = [];
    if (line === line17) {
      return new Promise((resolve, reject) => {
        this.scrapping(this.config.stib_17_heli, scrappIndiceDefault, line, 'HEILIGENBORRE').then((resultHeli) => {
          this.scrapping(this.config.stib_17_beaulieu, scrappIndiceBeaulieu, line, 'BEAULIEU').then((resultBeaulieu) => {
            result = resultBeaulieu.concat(resultHeli);
            resolve(result);
          }).catch((err) => {
            reject(err);
          });
        }).catch((err) => {
          reject(err);
        });
      });
    }
    if (line === line94) {
      return new Promise((resolve, reject) => {
        this.scrapping(this.config.stib_94_louise, scrappIndiceDefault, line, 'LOUISE').then((resultlouise) => {
          this.scrapping(this.config.stib_94_mt, scrappIndiceDefault, line, 'MUSEE DU TRAM').then((resultMt) => {
            result = resultlouise.concat(resultMt);
            resolve(result);
          }).catch((err) => {
            reject(err);
          });
        }).catch((err) => {
          reject(err);
        });
      });
    }
    if (line === line95) {
      return this.scrapping(this.config.stib_95_gp, scrappIndiceDefault, line, 'GRANDE PLACE');
    }
    return null;
  },
};

module.exports = Buisness;

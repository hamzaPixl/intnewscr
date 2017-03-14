function MapItem() {
}

/**
 * @private
 * @return the url of the map for brusels
 */
MapItem.getBrussels = function getBrussels() {
  return 'http://www.filebeeld.be/traffic/image?format=LARGE&region=brussel';
};


/**
 * @private
 * @return the url of the map for vlams
 */
MapItem.getVlaams = function getVlaams() {
  return 'http://www.filebeeld.be/traffic/image?format=LARGE&region=vlaamseruit';
};

MapItem.prototype = {};

module.exports = MapItem;

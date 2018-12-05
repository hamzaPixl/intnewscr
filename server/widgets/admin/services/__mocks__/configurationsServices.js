const view = widget => ({
  name: 'name',
  widget,
  path: 'path',
  queryParams: 'queryParams',
});

const configurations = {
  name: 'name',
  author: 'author',
  description: 'description',
  views: [view('admin'), view('news')],
};

async function createConfiguration() {
  // STUB configurations service
  return Promise.resolve(configurations);
}

async function getConfiguration() {
  // STUB configurations service
  return Promise.resolve(configurations);
}

async function getAllConfigurations() {
  // STUB configurations service
  return Promise.resolve([configurations]);
}

async function updateConfiguration() {
  // STUB configurations service
  return Promise.resolve(configurations);
}

async function deleteConfiguration() {
  // STUB configurations service
  return Promise.resolve({});
}

async function addView() {
  // STUB configurations service
  return Promise.resolve(view('widget'));
}

async function getView() {
  // STUB configurations service
  return Promise.resolve(view('widget'));
}

async function updateView() {
  // STUB configurations service
  return Promise.resolve(view('widget'));
}

async function deleteView() {
  // STUB configurations service
  return Promise.resolve({});
}

module.exports = {
  createConfiguration,
  getConfiguration,
  getAllConfigurations,
  updateConfiguration,
  deleteConfiguration,
  addView,
  getView,
  updateView,
  deleteView,
};

const path = require('path');
const fs = require('fs');
const registries = require('./registries.json');
const NRMRC = path.join(process.env.HOME, '.nrmrc');
const ini = require('ini');


function setCustomRegistry (config, cbk) {
  for (let name in config) {
    if (name in registries) {
      delete config[name].registry;
      delete config[name].home;
    }
  }
  fs.writeFile(NRMRC, ini.stringify(config), cbk)
}

module.exports.setCustomRegistry = setCustomRegistry
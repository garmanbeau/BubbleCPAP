const { withAndroidManifest } = require('@expo/config-plugins');

const withUsesCleartextTraffic = (config, value) => {
  return withAndroidManifest(config, async config => {
    config.modResults.application[0]['$']['android:usesCleartextTraffic'] = String(value);
    return config;
  });
};

module.exports = withUsesCleartextTraffic;

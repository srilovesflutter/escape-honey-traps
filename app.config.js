/**
 * Escape Honey Traps is a free Android app. There is no paid package,
 * no ads, and no in-app purchase. The Play listing is com.escapehoneytraps.app.
 */
module.exports = ({ config }) => ({
  ...config,
  name: 'Escape Honey Traps',
  version: '1.1.0',
  scheme: 'escapehoneytraps',
  android: {
    ...config.android,
    package: 'com.escapehoneytraps.app',
    versionCode: 3,
  },
  extra: {
    ...config.extra,
    androidPackage: 'com.escapehoneytraps.app',
  },
});

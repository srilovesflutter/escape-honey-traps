const { withAppBuildGradle } = require('expo/config-plugins');

/**
 * Release signing reads an untracked keystore.properties file, or the
 * EHT_UPLOAD_* environment variables. Nothing secret is written into the
 * generated Gradle file.
 */
const LOADER = `    def ehtProps = new Properties()
    def ehtPropsFile = rootProject.file("../keystore.properties")
    if (ehtPropsFile.exists()) {
        ehtProps.load(new FileInputStream(ehtPropsFile))
    }
    def ehtStoreFile = System.getenv("EHT_UPLOAD_STORE_FILE") ?: ehtProps.getProperty("storeFile")
    def ehtStorePassword = System.getenv("EHT_UPLOAD_STORE_PASSWORD") ?: ehtProps.getProperty("storePassword")
    def ehtKeyAlias = System.getenv("EHT_UPLOAD_KEY_ALIAS") ?: ehtProps.getProperty("keyAlias")
    def ehtKeyPassword = System.getenv("EHT_UPLOAD_KEY_PASSWORD") ?: ehtProps.getProperty("keyPassword")
`;

const RELEASE_CONFIG = `        release {
            if (ehtStoreFile && ehtStorePassword && ehtKeyAlias && ehtKeyPassword) {
                storeFile file(ehtStoreFile)
                storePassword ehtStorePassword
                keyAlias ehtKeyAlias
                keyPassword ehtKeyPassword
            }
        }
`;

function applyUploadSigning(contents) {
  if (contents.includes('EHT_UPLOAD_STORE_FILE')) return contents;
  if (!contents.includes('android {')) {
    throw new Error('android block not found in app/build.gradle');
  }
  let next = contents.replace('android {\n', `android {\n${LOADER}\n`);
  const debugOnly = `signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
    }`;
  if (!next.includes(debugOnly)) {
    throw new Error('debug signingConfigs block not found');
  }
  next = next.replace(
    debugOnly,
    `signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
${RELEASE_CONFIG}    }`,
  );
  const releaseLine =
    'signingConfig (ehtStoreFile && ehtStorePassword && ehtKeyAlias && ehtKeyPassword) ? signingConfigs.release : signingConfigs.debug';
  next = next.replace(
    /(release \{\n(?:.*\n)*?\s*)signingConfig signingConfigs\.debug\n/,
    `$1${releaseLine}\n`,
  );
  return next;
}

function withUploadSigning(config) {
  return withAppBuildGradle(config, (mod) => {
    mod.modResults.contents = applyUploadSigning(mod.modResults.contents);
    return mod;
  });
}

module.exports = withUploadSigning;
module.exports.applyUploadSigning = applyUploadSigning;

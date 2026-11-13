const { withAndroidManifest } = require('expo/config-plugins');

function addIntent(intents, action, scheme) {
  const exists = intents.some((intent) => {
    const name = intent.action?.[0]?.$?.['android:name'];
    const data = intent.data?.[0]?.$?.['android:scheme'];
    return name === action && data === scheme;
  });
  if (exists) return;
  intents.push({
    action: [{ $: { 'android:name': action } }],
    data: [{ $: { 'android:scheme': scheme } }],
  });
}

function withAndroidIntents(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    if (!manifest.queries) manifest.queries = [{}];
    const queries = manifest.queries[0];
    const current = queries.intent ? (Array.isArray(queries.intent) ? queries.intent : [queries.intent]) : [];
    addIntent(current, 'android.intent.action.DIAL', 'tel');
    addIntent(current, 'android.intent.action.SENDTO', 'mailto');
    queries.intent = current;
    manifest.queries = [queries];
    return config;
  });
}

module.exports = withAndroidIntents;

module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // See apps/example/babel.config.js — preset adds worklets plugin when present.
  };
};

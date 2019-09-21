(() => {
  function requireAll(r) {
    r.keys().forEach(r);
  }
  requireAll(require.context("../images/sprites/", true, /\.svg$/));
  lazyload();
})();

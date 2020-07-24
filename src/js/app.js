(() => {
  function requireAll(r) {
    r.keys().forEach(r);
  }

  requireAll(require.context("../images/sprites/", true, /\.svg$/));
  let lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });
})();

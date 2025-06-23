(async () => {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return;

  try {
    const res = await fetch('/map.json');
    const map = await res.json();

    if (map[hash]) {
      window.location.href = map[hash]; // 正常跳转（保留历史）
    } else {
      document.body.innerHTML = `<h1>404 Not Found</h1><p>No redirect defined for <code>#/${hash}</code></p>`;
    }
  } catch (err) {
    document.body.innerHTML = `<h1>Error</h1><p>Unable to load redirect map.</p>`;
  }
})();

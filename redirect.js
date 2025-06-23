(async () => {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, ''); // 去除前后斜杠
  if (!path || path === 'index.html') return; // 如果是首页就不跳转

  try {
    const res = await fetch('/map.json');
    const map = await res.json();

    if (map[path]) {
      window.location.href = map[path];
    } else {
      document.body.innerHTML = `<h1>404 Not Found</h1><p>No redirect defined for <code>/${path}</code></p>`;
    }
  } catch (err) {
    document.body.innerHTML = `<h1>Error</h1><p>Unable to load redirect map.</p>`;
  }
})();
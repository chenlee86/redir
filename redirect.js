(async () => {
  // 获取路径（去掉前后 /）
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (!path || path === 'index.html') return; // 首页不跳转

  try {
    const res = await fetch('/map.json');
    const map = await res.json();

    if (map[path]) {
      // 使用 replace 避免短链进入历史记录
      window.location.replace(map[path]);
    } else {
      // 未定义的路径返回 404 页面
      document.body.innerHTML = `<h1>404 Not Found</h1><p>No redirect defined for <code>/${path}</code></p>`;
    }
  } catch (err) {
    document.body.innerHTML = `<h1>Error</h1><p>Unable to load redirect map.</p>`;
  }
})();

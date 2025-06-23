(async () => {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const hash = window.location.hash.replace(/^#\/?/, '');

  try {
    const res = await fetch('/map.json');
    const map = await res.json();

    // 如果有 hash 则立即跳转
    if (hash && map[hash]) {
      window.location.replace(map[hash]);
      return;
    }

    // 否则渲染首页超链接
    const ul = document.createElement('ul');
    Object.keys(map).forEach(key => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = map[key];
      a.textContent = `/${key}`;
      a.target = '_blank';  // 在新窗口打开
      li.appendChild(a);
      ul.appendChild(li);
    });
    document.body.appendChild(ul);
  } catch (err) {
    document.body.innerHTML = `<h1>Error</h1><p>Unable to load redirect map.</p>`;
  }
})();

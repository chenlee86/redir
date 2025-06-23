(async () => {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const hash = window.location.hash.replace(/^#\/?/, '');

  try {
    const res = await fetch('/map.json');
    const map = await res.json();

    // 如果带 hash 跳转，则立即跳转
    if (hash && map[hash]) {
      window.location.replace(map[hash]);
      return;
    }

    // 否则动态生成可点击链接列表
    const container = document.getElementById('link-container');
    const ul = document.createElement('ul');

    Object.entries(map).forEach(([key, url]) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = url;
      a.textConte

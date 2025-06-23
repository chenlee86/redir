/* redirect.js  —— 只要 hash 变化就自动跳转 */
async function handleRedirect () {
  // 1️⃣ 取得 “#/webssh” 里的 webssh
  const key = location.hash.replace(/^#\/?/, '');
  if (!key) return;                 // 首页（没有 hash）什么也不做

  try {
    // 2️⃣ 读取映射表（加 cache:no-store 保证每次都取到最新）
    const res = await fetch('/map.json', { cache: 'no-store' });
    const map = await res.json();

    // 3️⃣ 如果映射存在就跳转，否则给 404 提示
    if (map[key]) {
      location.replace(map[key]);   // 不把短链留在历史记录里
    } else {
      document.body.innerHTML =
        `<h1>404 Not Found</h1><p>No redirect for <code>#/${key}</code></p>`;
    }
  } catch (e) {
    document.body.innerHTML =
      `<h1>Error</h1><p>Couldn’t load <code>map.json</code>.</p>`;
  }
}

/* ⬇️  首次加载和以后 hash 变化都调用一次  */
handleRedirect();
addEventListener('hashchange', handleRedirect);

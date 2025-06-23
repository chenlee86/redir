// 封装为函数，便于初次加载和 hash 变化时重复调用
async function handleRedirect() {
  const key = window.location.hash.replace(/^#\/?/, '');  // 取得去掉 "#/" 的短链键

  // 如果没有 hash（即访问首页），就什么也不做——首页会显示链接列表
  if (!key) return;

  try {
    // 读取映射表
    const res = await fetch('/map.json', { cache: 'no-store' });
    const map = await res.json();

    // 如果映射存在就跳转，否则显示 404
    if (map[key]) {
      window.location.replace(map[key]);   // 不在历史记录中保留短链
    } else {
      document.body.innerHTML = `<h1>404 Not Found</h1><p>No redirect defined for <code>#/${key}</code></p>`;
    }
  } catch (err) {
    document.body.innerHTML = `<h1>Error</h1><p>Unable to load redirect map.</p>`;
  }
}

// ① 初次加载执行一次
handleRedirect();

// ② 监听 hash 变化（点击 /#/xxx、手动改 hash、后退按钮都会触发）
window.addEventListener('hashchange', handleRedirect);

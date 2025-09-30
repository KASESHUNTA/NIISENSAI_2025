document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
  
    // 指定されたIDの要素へスムーズスクロールする関数
    function scrollToTarget(targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  
    // --- ページ読み込み時の処理 ---
    // ページがトップページ（index.html）で、URLにハッシュがある場合にスクロールを実行
    const isTopPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
    if (isTopPage) {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1);
        // ページ遷移とレンダリングが落ち着くのを少し待ってからスクロール
        setTimeout(() => {
          scrollToTarget(targetId);
        }, 100);
      }
    }
  
    // --- クリック時の処理 ---
    // フッターメニュー内のアンカーリンクをすべて取得
    const links = document.querySelectorAll('.footer-menu a[href*="#"]');
  
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // hrefからURLオブジェクトを生成して、パスとハッシュを簡単に取得できるようにする
        const url = new URL(href, window.location.href);
        const targetPath = url.pathname;
        const targetHash = url.hash;
  
        // 現在のページがトップページで、かつ、クリックしたリンクもトップページを指している場合
        if (isTopPage && (targetPath.endsWith('/') || targetPath.endsWith('index.html')) && targetHash) {
          // デフォルトの動作（ページ遷移）をキャンセルして、スムーズスクロールを実行
          e.preventDefault();
          const targetId = targetHash.substring(1);
          scrollToTarget(targetId);
        }
        
        // それ以外の場合（例: Greetings/index.html からトップへのリンクをクリック）は、
        // e.preventDefault() を実行しないので、通常のページ遷移が行われる。
        // そして、遷移先のindex.htmlで上記の「ページ読み込み時の処理」が実行される。
      });
    });
  });
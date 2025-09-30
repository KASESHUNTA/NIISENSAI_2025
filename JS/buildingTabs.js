document.addEventListener("DOMContentLoaded", function () {
  // デバッグ用：初期状態のパネルをログ出力
  console.log(
    "初期状態のパネル:",
    document.querySelectorAll(".building-panel")
  );
  const tabs = document.querySelectorAll(".building-tab");
  const panels = document.querySelectorAll(".building-panel");

  // タブクリックイベントの処理
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // アクティブなタブのクラスを削除
      tabs.forEach((t) => t.classList.remove("active"));
      // クリックされたタブをアクティブに
      tab.classList.add("active");

      // 全てのパネルを非表示
      panels.forEach((panel) => panel.classList.remove("active"));
      // クリックされたタブに対応するパネルを表示
      const targetPanel = document.getElementById(tab.dataset.building);
      if (targetPanel) {
        targetPanel.classList.add("active");
        // デバッグ用：パネルの切り替え時の状態をログ出力
        console.log("切り替え後のパネル:", tab.dataset.building, targetPanel);
      } else {
        console.log("対象のパネルが見つかりません:", tab.dataset.building);
      }
    });
  });
});

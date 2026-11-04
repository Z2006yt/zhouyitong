/* ============================================================
   作者: 周怡彤
   建立时间: 2026-11-04
   使用大模型: GLM-5.3-Flash
   功能名称: 可复用 Tab 选项卡组件（外部引用）
   ============================================================ */

/**
 * 功能: 将一组 tab 按钮与对应面板绑定为可切换选项卡，可复用于任意页面
 * 参数: config = { tabSelector, panelSelector, activeTabClass, activePanelClass, defaultIndex }
 */
function zyt_initTabs(config) {
  var zyt_tabs = document.querySelectorAll(config.tabSelector);
  var zyt_panels = document.querySelectorAll(config.panelSelector);
  var zyt_tabActive = config.activeTabClass || 'zyt_active';
  var zyt_panelActive = config.activePanelClass || 'zyt_show';

  // 功能: 清除所有选项卡与面板的选中状态
  function zyt_clearAll() {
    zyt_tabs.forEach(function (zyt_t) { zyt_t.classList.remove(zyt_tabActive); });
    zyt_panels.forEach(function (zyt_p) { zyt_p.classList.remove(zyt_panelActive); });
  }

  // 功能: 先清除所有选中状态，再设置当前索引对应的选项卡与面板为选中
  function zyt_activate(zyt_idx) {
    zyt_clearAll();
    if (zyt_tabs[zyt_idx]) { zyt_tabs[zyt_idx].classList.add(zyt_tabActive); }
    if (zyt_panels[zyt_idx]) { zyt_panels[zyt_idx].classList.add(zyt_panelActive); }
  }

  // 功能: 为每个选项卡绑定点击监听事件，点击时切换选中态
  zyt_tabs.forEach(function (zyt_tab, zyt_idx) {
    zyt_tab.addEventListener('click', function () {
      zyt_activate(zyt_idx); // 先清除所有选项卡的选中状态，然后再设置当前元素的选中状态
    });
  });

  // 功能: 初始化时设置默认选中的选项卡（国内新闻为第 0 项）
  zyt_activate(config.defaultIndex || 0);

  // 功能: 返回组件接口，供外部以编程方式切换选项卡
  return { activate: zyt_activate };
}

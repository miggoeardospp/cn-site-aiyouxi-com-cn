// public/site-helper.js

(function () {
  "use strict";

  const CONFIG = {
    site: "https://cn-site-aiyouxiyou.com.cn",
    keyword: "爱游戏",
    storageKey: "siteTipDismissed",
    bannerId: "site-helper-banner",
    tagContainerId: "site-keyword-tags",
    instructionId: "site-access-usage"
  };

  function createStyle() {
    const style = document.createElement("style");
    style.textContent = `
      #${CONFIG.bannerId} {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2c3e50;
        color: #ecf0f1;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        font-size: 14px;
        max-width: 280px;
        z-index: 9999;
        transition: opacity 0.3s;
      }
      #${CONFIG.bannerId} .close-btn {
        background: transparent;
        border: none;
        color: #bdc3c7;
        float: right;
        font-size: 18px;
        cursor: pointer;
        margin-left: 12px;
        line-height: 1;
      }
      #${CONFIG.bannerId} a {
        color: #f1c40f;
        text-decoration: underline;
      }
      #${CONFIG.tagContainerId} {
        margin: 12px 0;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .keyword-badge {
        background: #16a085;
        color: #fff;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
      }
      #${CONFIG.instructionId} {
        margin-top: 10px;
        border-top: 1px solid #7f8c8d;
        padding-top: 8px;
        font-size: 12px;
        color: #bdc3c7;
      }
    `;
    document.head.appendChild(style);
  }

  function hasDismissed() {
    try {
      return localStorage.getItem(CONFIG.storageKey) === "true";
    } catch (e) {
      return false;
    }
  }

  function dismissTip() {
    try {
      localStorage.setItem(CONFIG.storageKey, "true");
    } catch (e) {
      // ignore
    }
    const banner = document.getElementById(CONFIG.bannerId);
    if (banner) {
      banner.style.opacity = "0";
      setTimeout(() => banner.remove(), 300);
    }
  }

  function createBanner() {
    if (hasDismissed()) return;

    const banner = document.createElement("div");
    banner.id = CONFIG.bannerId;

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "✕";
    closeBtn.setAttribute("aria-label", "关闭提示");
    closeBtn.addEventListener("click", dismissTip);
    banner.appendChild(closeBtn);

    const link = document.createElement("a");
    link.href = CONFIG.site;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "欢迎访问 " + CONFIG.site;
    banner.appendChild(link);

    const tagsDiv = document.createElement("div");
    tagsDiv.id = CONFIG.tagContainerId;
    const keywords = ["爱游戏", "自由探索", "乐趣无限", "每日挑战"];
    keywords.forEach(function (word) {
      const span = document.createElement("span");
      span.className = "keyword-badge";
      span.textContent = word;
      tagsDiv.appendChild(span);
    });
    banner.appendChild(tagsDiv);

    const instrDiv = document.createElement("div");
    instrDiv.id = CONFIG.instructionId;
    instrDiv.textContent = "请使用Chrome/Firefox获得最佳体验。推荐在桌面端访问。";
    banner.appendChild(instrDiv);

    document.body.appendChild(banner);
  }

  function init() {
    createStyle();
    createBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
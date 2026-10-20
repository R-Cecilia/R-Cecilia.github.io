(() => {
  // The site owns navigation and appearance; no theme event-prototype patches.
  const menuButton = document.querySelector("#main-nav-toggle");
  const syncMenu = () => {
    const open = document.body.classList.contains("mobile-nav-on");
    menuButton?.setAttribute("aria-expanded", String(open));
    menuButton?.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
  };
  const closeMenu = () => {
    document.body.classList.remove("mobile-nav-on");
    document.querySelector("#mask")?.classList.add("hide");
    syncMenu();
  };
  menuButton?.addEventListener("click", () => {
    const open = document.body.classList.toggle("mobile-nav-on");
    document.querySelector("#mask")?.classList.toggle("hide", !open);
    syncMenu();
  });
  document.querySelector("#mask")?.addEventListener("click", closeMenu);
  document.querySelectorAll("#mobile-nav a").forEach((link) => link.addEventListener("click", closeMenu));
  syncMenu();
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("mobile-nav-on")) {
      closeMenu();
      menuButton?.focus();
    }
  });

  const themeButton = document.querySelector(".dark-mode-btn");
  if (themeButton) {
    const systemTheme = matchMedia("(prefers-color-scheme: dark)");
    let mode = "false";
    try { mode = localStorage.getItem("dark_mode") || mode; } catch { /* Use light mode. */ }
    if (!["false", "true", "auto"].includes(mode)) mode = "false";
    const applyTheme = () => {
      const dark = mode === "true" || (mode === "auto" && systemTheme.matches);
      if (dark) document.documentElement.dataset.theme = "dark";
      else delete document.documentElement.dataset.theme;
      themeButton.textContent = {false: "☀", true: "☾", auto: "◐"}[mode];
      themeButton.title = {false: "浅色", true: "深色", auto: "跟随系统"}[mode];
      document.body.dispatchEvent(new CustomEvent("reimu:theme-set", {detail: {isDark: dark, mode}}));
    };
    themeButton.addEventListener("click", () => {
      const modes = ["false", "true", "auto"];
      mode = modes[(modes.indexOf(mode) + 1) % modes.length];
      try { localStorage.setItem("dark_mode", mode); } catch { /* Appearance still works. */ }
      applyTheme();
    });
    systemTheme.addEventListener("change", () => { if (mode === "auto") applyTheme(); });
    applyTheme();
  }
  const toTop = document.querySelector(".sidebar-top");
  toTop?.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
  let topFrame = false;
  const updateTop = () => {
    if (toTop) toTop.style.opacity = window.scrollY < 10 ? "0" : "1";
    topFrame = false;
  };
  updateTop();
  window.addEventListener("scroll", () => {
    if (!topFrame) { topFrame = true; requestAnimationFrame(updateTop); }
  }, {passive: true});
  // Dynamic module imports keep the vendor's integrity check.
  window.safeImport = async (url, integrity) => {
    const response = await fetch(url, integrity ? {integrity} : {});
    if (!response.ok) throw new Error(`Module request failed: ${response.status}`);
    const blob = URL.createObjectURL(new Blob([await response.text()], {type: "application/javascript"}));
    try { return await import(blob); } finally { URL.revokeObjectURL(blob); }
  };
  document.querySelectorAll(".topic-links a").forEach((link) => {
    if (new URL(link.href).pathname === window.location.pathname) link.setAttribute("aria-current", "page");
  });

  const friendButtons = [...document.querySelectorAll("[data-friend-filter]")];
  const friendCategories = [...document.querySelectorAll("[data-friend-category]")];
  friendButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.friendFilter;
      let visibleCount = 0;
      friendCategories.forEach((category) => {
        category.hidden = filter !== "all" && category.dataset.friendCategory !== filter;
        if (!category.hidden) visibleCount += category.querySelectorAll(".friend-card").length;
      });
      friendButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      const status = document.querySelector(".friend-filter-status");
      if (status) status.textContent = `${filter === "all" ? "全部" : filter} ${visibleCount} 个站点`;
    });
  });

  const archivePage = document.querySelector(".archive-page");
  if (archivePage) {
    const items = [...archivePage.querySelectorAll("[data-archive-item]")];
    const years = [...archivePage.querySelectorAll("[data-archive-year]")];
    const buttons = [...archivePage.querySelectorAll("[data-archive-filter]")];
    const search = archivePage.querySelector("[data-archive-search]");
    const kind = archivePage.querySelector("select[data-archive-kind]");
    let activeCategory = "all";
    const normalize = (value) => value.trim().toLocaleLowerCase("zh-CN");
    const applyFilters = () => {
      const query = normalize(search.value);
      let total = 0;
      items.forEach((item) => {
        const categories = (item.dataset.archiveCategories || "").split("|");
        const matchesCategory = activeCategory === "all" || categories.includes(activeCategory);
        const matchesKind = kind.value === "all" || item.dataset.archiveKind === kind.value;
        const matchesQuery = !query || normalize(item.dataset.archiveSearch || "").includes(query);
        item.hidden = !(matchesCategory && matchesKind && matchesQuery);
        if (!item.hidden) total += 1;
      });
      years.forEach((year) => {
        const count = year.querySelectorAll("[data-archive-item]:not([hidden])").length;
        year.hidden = count === 0;
        year.querySelector("[data-archive-year-count]").textContent = `${count} 篇`;
      });
      buttons.forEach((button) => {
        const active = button.dataset.archiveFilter === activeCategory;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      archivePage.querySelector("[data-archive-status]").textContent = `${total} 篇内容`;
      archivePage.querySelector("[data-archive-empty]").hidden = total !== 0;
    };
    buttons.forEach((button) => button.addEventListener("click", () => {
      activeCategory = button.dataset.archiveFilter;
      applyFilters();
    }));
    search.addEventListener("input", applyFilters);
    kind.addEventListener("change", applyFilters);
    search.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { search.value = ""; applyFilters(); }
    });
  }

  const chapterSearch = document.querySelector("[data-chapter-search]");
  if (chapterSearch) {
    const chapters = [...document.querySelectorAll("[data-chapter-item]")];
    const filterChapters = () => {
      const query = chapterSearch.value.trim().toLocaleLowerCase();
      chapters.forEach((chapter) => {
        chapter.hidden = !chapter.textContent.toLocaleLowerCase().includes(query);
      });
      document.querySelector("[data-chapter-empty]").hidden = chapters.some((chapter) => !chapter.hidden);
    };
    chapterSearch.addEventListener("input", filterChapters);
    chapterSearch.addEventListener("search", filterChapters);
    chapterSearch.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { chapterSearch.value = ""; filterChapters(); }
    });
  }

  const article = document.querySelector(".stellar-article-shell");
  if (!article) return;
  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("role", "progressbar");
  progress.setAttribute("aria-label", "文章阅读进度");
  progress.setAttribute("aria-valuemin", "0");
  progress.setAttribute("aria-valuemax", "100");
  document.body.append(progress);
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const value = scrollable > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollable * 100)) : 0;
    progress.style.setProperty("--reading-progress", `${value}%`);
    progress.setAttribute("aria-valuenow", String(Math.round(value)));
  };
  updateProgress();
  let progressFrame = false;
  window.addEventListener("scroll", () => {
    if (progressFrame) return;
    progressFrame = true;
    requestAnimationFrame(() => { updateProgress(); progressFrame = false; });
  }, { passive: true });
  window.addEventListener("resize", updateProgress);
})();

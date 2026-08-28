(() => {
  const filterButtons = [...document.querySelectorAll("[data-friend-filter]")];
  const friendCategories = [...document.querySelectorAll("[data-friend-category]")];
  const filterStatus = document.querySelector(".friend-filter-status");

  if (filterButtons.length && friendCategories.length) {
    const applyFriendFilter = (filter) => {
      let visibleCount = 0;

      friendCategories.forEach((category) => {
        const visible = filter === "all" || category.dataset.friendCategory === filter;
        category.hidden = !visible;
        if (visible) visibleCount += category.querySelectorAll(".friend-card").length;
      });

      filterButtons.forEach((button) => {
        const active = button.dataset.friendFilter === filter;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });

      if (filterStatus) {
        const label = filter === "all" ? "全部" : filter;
        filterStatus.textContent = `正在显示${label} ${visibleCount} 个站点`;
      }
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => applyFriendFilter(button.dataset.friendFilter));
    });
  }

  const archivePage = document.querySelector(".archive-page");

  if (archivePage) {
    const archiveItems = [...archivePage.querySelectorAll("[data-archive-item]")];
    const archiveYears = [...archivePage.querySelectorAll("[data-archive-year]")];
    const archiveFilters = [...archivePage.querySelectorAll("[data-archive-filter]")];
    const archiveYearLinks = [...archivePage.querySelectorAll("[data-archive-year-link]")];
    const archiveSearch = archivePage.querySelector("[data-archive-search]");
    const archiveClear = archivePage.querySelector("[data-archive-clear]");
    const archiveStatus = archivePage.querySelector("[data-archive-status]");
    const archiveEmpty = archivePage.querySelector("[data-archive-empty]");
    let activeCategory = "all";

    const normalize = (value) => value.trim().toLocaleLowerCase("zh-CN");

    const applyArchiveFilters = () => {
      const query = normalize(archiveSearch?.value || "");
      let visibleTotal = 0;

      archiveItems.forEach((item) => {
        const categories = (item.dataset.archiveCategories || "").split("|").filter(Boolean);
        const matchesCategory = activeCategory === "all" || categories.includes(activeCategory);
        const matchesQuery = !query || normalize(item.dataset.archiveSearch || "").includes(query);
        const visible = matchesCategory && matchesQuery;

        item.hidden = !visible;
        if (visible) visibleTotal += 1;
      });

      archiveYears.forEach((year) => {
        const visibleItems = year.querySelectorAll("[data-archive-item]:not([hidden])").length;
        year.hidden = visibleItems === 0;
        const yearCount = year.querySelector("[data-archive-year-count]");
        if (yearCount) yearCount.textContent = `${visibleItems} 篇`;
      });

      archiveYearLinks.forEach((link) => {
        const year = archivePage.querySelector(`[data-archive-year="${link.dataset.archiveYearLink}"]`);
        link.hidden = !year || year.hidden;
      });

      archiveFilters.forEach((button) => {
        const active = button.dataset.archiveFilter === activeCategory;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });

      if (archiveClear) archiveClear.hidden = !query;
      if (archiveEmpty) archiveEmpty.hidden = visibleTotal !== 0;
      if (archiveStatus) {
        const categoryLabel = activeCategory === "all" ? "" : `${activeCategory} · `;
        archiveStatus.textContent = `正在显示 ${categoryLabel}${visibleTotal} 篇文章`;
      }
    };

    archiveFilters.forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.archiveFilter || "all";
        applyArchiveFilters();
      });
    });

    archiveSearch?.addEventListener("input", applyArchiveFilters);
    archiveSearch?.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && archiveSearch.value) {
        archiveSearch.value = "";
        applyArchiveFilters();
      }
    });

    archiveClear?.addEventListener("click", () => {
      if (!archiveSearch) return;
      archiveSearch.value = "";
      archiveSearch.focus();
      applyArchiveFilters();
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
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
})();

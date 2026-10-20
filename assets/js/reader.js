// Reading enhancements load only on article and notebook pages.
(() => {
  const article = document.querySelector(".article-entry");
  if (!article) return;

  article.querySelectorAll("table").forEach((table) => {
    if (table.closest(".highlight, .table-wrapper")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "table-wrapper";
    table.before(wrapper);
    wrapper.append(table);
  });

  article.querySelectorAll("img").forEach((image) => {
    if (image.closest("a") || image.classList.contains("no-lightbox")) return;
    const link = document.createElement("a");
    link.href = image.src;
    link.target = "_blank";
    link.rel = "noopener";
    link.className = "article-gallery-item";
    const dimensions = () => {
      link.dataset.pswpWidth = image.naturalWidth || image.width;
      link.dataset.pswpHeight = image.naturalHeight || image.height;
    };
    dimensions();
    image.addEventListener("load", dimensions, {once: true});
    image.before(link);
    link.append(image);
  });

  article.querySelectorAll(".highlight").forEach((block) => {
    const code = block.querySelector("tr td:last-of-type code") || block.querySelector("code");
    if (!code) return;
    const toolbar = document.createElement("div");
    toolbar.className = "code-figcaption";
    toolbar.innerHTML = '<div class="code-left-wrap"><div class="code-decoration"></div><div class="code-lang"></div></div><div class="code-right-wrap"><button type="button" class="code-copy" aria-label="复制代码" title="复制代码">⧉</button><button type="button" class="code-expand" aria-label="折叠代码" aria-expanded="true" title="折叠代码">⌄</button></div>';
    toolbar.querySelector(".code-lang").textContent = (code.dataset.lang || "text").toUpperCase();
    block.prepend(toolbar);
    const expand = toolbar.querySelector(".code-expand");
    expand.addEventListener("click", () => {
      const closed = block.classList.toggle("code-closed");
      expand.setAttribute("aria-expanded", String(!closed));
      expand.setAttribute("aria-label", closed ? "展开代码" : "折叠代码");
      expand.title = closed ? "展开代码" : "折叠代码";
    });
    const copy = toolbar.querySelector(".code-copy");
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.innerText);
        copy.textContent = "✓";
        copy.setAttribute("aria-label", "复制成功");
      } catch {
        copy.textContent = "!";
        copy.setAttribute("aria-label", "复制失败，请手动选择代码");
      }
      copy.title = copy.getAttribute("aria-label");
      setTimeout(() => { copy.textContent = "⧉"; copy.setAttribute("aria-label", "复制代码"); copy.title = "复制代码"; }, 1800);
    });
  });

  article.querySelectorAll(".tabs").forEach((tabs) => {
    tabs.querySelectorAll(".nav-tabs li.tab a").forEach((link) => link.addEventListener("click", (event) => {
      const id = (link.getAttribute("class") || "").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      tabs.querySelectorAll(".tab-pane, li.tab").forEach((pane) => pane.classList.remove("active"));
      target.classList.add("active");
      link.parentElement.classList.add("active");
    }));
  });

  const links = [...document.querySelectorAll(".sidebar-toc-wrapper a")];
  const headings = [...article.querySelectorAll("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]")];
  if (links.length && headings.length) {
    const activate = (id) => links.forEach((link) => {
      let target;
      try { target = decodeURIComponent(link.hash.slice(1)); } catch { return; }
      const active = target === id;
      link.closest("li")?.classList.toggle("current", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    const observer = new IntersectionObserver((entries) => {
      const first = entries.filter((entry) => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (first) activate(first.target.id);
    }, {rootMargin: "-80px 0px -60% 0px"});
    headings.forEach((heading) => observer.observe(heading));
  }
})();

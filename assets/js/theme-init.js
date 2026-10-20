// Apply the saved appearance before painting the page.
try {
  const mode = localStorage.getItem("dark_mode") || "false";
  if (mode === "true" || (mode === "auto" && matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
} catch {
  // Storage may be unavailable; retain the site's default light palette.
}

# Cecilia's Hugo Blog

This repository stores the Hugo source for <https://r-cecilia.github.io/>.
GitHub Actions builds and deploys the site from the `source` branch. Generated
files under `public/` are not committed to this branch.

## Local development

Start the local development server on Windows:

```powershell
.\hugo.exe server -D
```

Run a production-style build check without overwriting the local `public/`
deployment repository:

```powershell
.\hugo.exe --renderToMemory --noBuildLock --gc --minify
```

## Deployment

Push a commit to `source`. The workflow in `.github/workflows/hugo.yaml` builds
the site with Hugo Extended 0.161.1 and deploys the generated `public/` artifact
to GitHub Pages.

The legacy generated site remains on the `main` branch for rollback during the
migration period.

## Theme maintenance

The repository vendors Reimu v0.16.1 under `themes/reimu` so builds remain
reproducible without downloading theme code at deploy time. Project-level
directories contain only intentional site customizations; do not copy the
theme's `layouts`, `static`, or `data/vendor.yml` files into the project root.

When updating Reimu, replace the vendored directory from an official tagged
release, review its changelog and configuration changes, then run the local
production build check before committing. The project-owned `data/covers.yml`
and `data/friends.yml` files intentionally override the theme's example data.

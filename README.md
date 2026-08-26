# Cecilia's Hugo Blog

This repository stores the Hugo source for <https://r-cecilia.github.io/>.
GitHub Actions builds and deploys the site from the `source` branch. Generated
files under `public/` are not committed to this branch.

## Local development

Install Hugo Extended 0.161.1 or newer and make sure `hugo` is available on
`PATH`. On Windows, the official Winget package can be installed with:

```powershell
winget install Hugo.Hugo.Extended
hugo version
```

Start the local development server on Windows:

```powershell
hugo server -D
```

Run a production-style build check without overwriting the local `public/`
deployment repository:

```powershell
hugo --renderToMemory --noBuildLock --gc --minify
```

## Deployment

Push a commit to `source`. The workflow in `.github/workflows/hugo.yaml` builds
the site with Hugo Extended 0.161.1 and deploys the generated `public/` artifact
to GitHub Pages.

The legacy generated site is preserved by the
`legacy-pages-before-actions` tag. The former `main` deployment branch and the
local nested `public/` repository were removed after the Actions deployment was
verified. To inspect the old site, create a temporary branch from that tag.

## Theme maintenance

The repository vendors Reimu v0.16.1 under `themes/reimu` so builds remain
reproducible without downloading theme code at deploy time. Project-level
directories contain only intentional site customizations; do not copy the
theme's `layouts`, `static`, or `data/vendor.yml` files into the project root.

When updating Reimu, replace the vendored directory from an official tagged
release, review its changelog and configuration changes, then run the local
production build check before committing. The project-owned `data/covers.yml`
and `data/friends.yml` files intentionally override the theme's example data.

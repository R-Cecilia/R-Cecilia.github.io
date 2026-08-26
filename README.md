# Cecilia's Hugo Blog

This repository stores the Hugo source for <https://R-Cecilia.github.io/>.
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

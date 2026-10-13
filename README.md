# OpportunityDesk — alternative website

A complete static website with responsive navigation, accessible role tabs, FAQ disclosures, and a sourcing brief download.

The refined design uses a locally hosted Instrument Sans font. Its license is included in `dist/fonts/OFL.txt`; visual conventions are recorded in `DESIGN.md`.

The download happens in the visitor's browser. There is no enquiry backend or email recipient; this preserves the source website's stated behavior. Sample business context and map are illustrative.

Serve `dist/` using any static HTTP server. Edit `dist/index.html`, `style.css`, and `app.js` to change content or behavior. Hosting identity is preserved in `.openai/hosting.json`.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes `dist/` when changes are pushed to `main`, or when run manually. Enable GitHub Pages with GitHub Actions as the publishing source before running the workflow. Private repositories require a GitHub plan that supports Pages; public repositories can use GitHub Free.

The project website address is `https://zorosec.github.io/opportunitydesk-website/`. Assets use relative paths so they load from both the project URL and other static hosts.

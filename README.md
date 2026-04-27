# Visa Slots Web

React + TypeScript + Vite dashboard for viewing visa slot availability.

## Local Environment

Copy `.env.example` to `.env.local` and fill in local values:

```bash
VITE_API_URL=https://app.checkvisaslots.com
VITE_API_KEY=
```

Do not commit `.env.local`, `.env`, or any real API keys. The `.gitignore` file excludes local environment files and logs.

Important: Vite exposes `VITE_*` variables to browser JavaScript at build time. This prevents accidental GitHub commits, but it does not keep the API key secret from end users. Use a backend or serverless proxy for any key that must remain private.

## Checks

```bash
npm run lint
npm run build
npm run check:secrets
```

`check:secrets` scans committed source files for common secret patterns and hides any detected values in its output.

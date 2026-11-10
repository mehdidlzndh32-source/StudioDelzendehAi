# StudioDelzendehAi

A Vite + React + TypeScript product shell for a multi-module AI operations platform. This repository is being prepared for safer runtime integration and deployment readiness. The UI contains many product mockups and operational concepts, but none of the external system integrations are considered live until they are connected through a server-side workflow and verified in a sandboxed environment.

## Local development

```bash
bun install --frozen-lockfile
cp .env.example .env.local
bun run dev
```

## Runtime environment contract

The frontend should only consume public client configuration variables. Do not place service-role keys, platform secrets, or payment credentials in `VITE_*` variables.

Required Firebase settings for web clients:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_STORAGE_BUCKET` (optional)
- `VITE_FIREBASE_MESSAGING_SENDER_ID` (optional)
- `VITE_FIREBASE_DATABASE_ID` (optional)

Server-only credentials must live in the hosting provider's secret manager or a protected backend service, not beside the frontend bundle.

## Safe integration model

1. Choose one durable source of truth for each domain (Firebase, Supabase, or a dedicated backend API).
2. Keep secrets on the server, never in the browser bundle.
3. Use OAuth flows or signed server-to-server calls for social media publishing.
4. Add a durable queue, retry rules, idempotency keys, and audit logs before enabling scheduled publishing.
5. Keep a manual emergency stop and a preview/staging environment before production rollout.
6. Treat the Firestore rules as a security boundary and validate them in a non-production project first.

## What is currently ready

- Frontend build baseline for Vite + React + TypeScript is present.
- Firebase client initialization is guarded so the app does not hard-fail when the project lacks runtime environment values.
- Firestore access rules are restricted by default and require trusted Auth roles.

## What is still required before live use

- Verified backend API for provider integrations.
- Provider-specific OAuth and token refresh handling.
- Queueing and scheduling for social-channel publishing.
- Audit and approval workflows for finance, publishing, and account actions.
- Monitoring, rate-limit handling, retry logic, and manual kill-switches.

## Deployment checklist

- Run `bun run lint` and `bun run build` in CI.
- Verify the Firebase environment variables are present in the deployment environment.
- Deploy rules separately to Firebase.
- Test each provider in a sandbox account before enabling production publishing.
- Rotate any credential that was previously committed to the repository history.

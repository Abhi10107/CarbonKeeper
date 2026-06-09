# CarbonKeeper Deployment Checklist

- GitHub ready
- Render ready
- Vercel ready
- Environment variables required
- Expected deployment URLs
- Common troubleshooting steps

## Required Environment Variables

- `GEMINI_API_KEY`
- `FRONTEND_URL`
- `VITE_API_URL`

## Expected Deployment URLs

- Frontend: `https://<your-vercel-project>.vercel.app`
- Backend: `https://<your-render-service>.onrender.com`

## Common Troubleshooting

- Confirm `VITE_API_URL` points to the deployed Render backend URL.
- Confirm `FRONTEND_URL` matches the deployed Vercel domain.
- Confirm the backend health check responds at `/health`.
- Confirm `npm install` and `npm run build` succeed in both app directories.
- Confirm the backend service has `GEMINI_API_KEY` set if live AI parsing is desired.

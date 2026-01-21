# The Roblox Aced Show

Official tournament website for **The Roblox Aced Show**.

## Features
- 🎯 Season-based leaderboard
- 🏆 Auto top-3 winner tagging
- 👤 Player profiles with roles & achievements
- 🖼️ Custom avatar uploads
- 🔐 Multi-admin authentication
- 💾 LocalStorage-backed (no backend required)
- ⚡ Fully static (GitHub Pages ready)

## Admin Access
- Admin panel: `/admin.html`
- Login uses multiple staff accounts (defined in `auth.js`)
- Sessions persist per browser session

## Data Storage
- All data is stored in `localStorage`
- Clearing browser storage resets the site

## Deployment (GitHub Pages)
1. Push repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main / root`
4. Done ✅

## Security Note
This project uses client-side admin auth.
It is suitable for tournaments and community sites,
but **not for sensitive personal data**.

# Auzle Web - Daily Blogspot Automation

## How It Works

A GitHub Actions workflow runs daily at midnight IST and publishes 3 posts (Easy/Medium/Hard) to your Blogspot via the Blogger API.

## One-Time Setup

### 1. Get your Blog ID

Go to your Blogger dashboard → Settings → look at the URL:
`https://www.blogger.com/blog/posts/XXXXXXXXX` ← that number is your Blog ID.

### 2. Create Google OAuth2 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project (or use existing)
3. Enable **Blogger API v3**: APIs & Services → Library → search "Blogger" → Enable
4. Create OAuth credentials: APIs & Services → Credentials → Create Credentials → OAuth client ID
   - Application type: **Web application**
   - Authorized redirect URIs: `https://developers.google.com/oauthplayground`
5. Note down the **Client ID** and **Client Secret**

### 3. Get a Refresh Token

1. Go to [OAuth Playground](https://developers.google.com/oauthplayground/)
2. Click ⚙️ (gear icon) → Check "Use your own OAuth credentials"
3. Enter your Client ID and Client Secret
4. In Step 1, find **Blogger API v3** → select `https://www.googleapis.com/auth/blogger`
5. Click "Authorize APIs" → sign in with your Google account
6. In Step 2, click "Exchange authorization code for tokens"
7. Copy the **Refresh Token**

### 4. Add Secrets to GitHub

Go to https://github.com/badcoder/auzle-web/settings/secrets/actions

Add these repository secrets:

| Secret Name | Value |
|---|---|
| `BLOGGER_BLOG_ID` | Your blog ID number |
| `BLOGGER_CLIENT_ID` | OAuth Client ID |
| `BLOGGER_CLIENT_SECRET` | OAuth Client Secret |
| `BLOGGER_REFRESH_TOKEN` | Refresh token from playground |

### 5. Test It

Go to Actions tab → "Daily Blogspot Posts" → "Run workflow" → Run.

Check your Blogspot — 3 new posts should appear!

## Schedule

The workflow runs daily at **18:30 UTC** (midnight IST). Each run creates:
- 🎧 Auzle #N · Easy · YYYY-MM-DD
- 🎧 Auzle #N · Medium · YYYY-MM-DD
- 🎧 Auzle #N · Hard · YYYY-MM-DD

Posts are labeled with `auzle`, difficulty, and puzzle number for easy filtering.

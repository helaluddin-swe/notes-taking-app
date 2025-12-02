# Production Deployment Guide for Render

## ✅ Updates Applied

### 1. **Backend CORS Fixed** ✓

- Updated `backend/src/server.js` to support production CORS
- Now works in both development and production modes
- Respects `FRONTEND_URL` environment variable

### 2. **API Instance URL Fixed** ✓

- Removed extra spaces from `frontend/src/utils/apiInstance.js`
- Properly detects development vs production mode

### 3. **Frontend Path Fixed** ✓

- Updated static file serving path in `backend/src/server.js`
- Correctly handles monorepo structure on Render

### 4. **render.yaml Created** ✓

- Configuration file for automated deployment
- Sets all required environment variables

---

## 📋 Deployment Steps

### Step 1: Update MongoDB & Upstash Credentials (IMPORTANT!)

Since your `.env` is in git history (security risk):

1. Go to MongoDB Atlas → Create new user with strong password
2. Get new connection string and update in Render dashboard
3. Go to Upstash console → Regenerate REST token
4. Update credentials in Render environment variables

### Step 2: Push to GitHub

```powershell
git add -A
git commit -m "Production deployment updates for Render"
git push origin main
```

### Step 3: Deploy on Render.com

**Option A: Using render.yaml (Recommended)**

1. Connect your GitHub repo to Render
2. Render will auto-detect `render.yaml`
3. Configure and deploy

**Option B: Manual Setup**

1. Create new **Web Service** on Render
2. Connect to your GitHub repo
3. Set Runtime: **Node**
4. Set Build Command: `cd backend && npm install`
5. Set Start Command: `cd backend && npm start`
6. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGO_URI` = (your new MongoDB URI)
   - `UPSTASH_REDIS_REST_URL` = (your Redis URL)
   - `UPSTASH_REDIS_REST_TOKEN` = (your new token)
   - `FRONTEND_URL` = (your Render frontend URL, e.g., `https://notes-app-frontend.onrender.com`)

### Step 4: Build Frontend Separately (if needed)

If you want to serve frontend from a separate Render Static Site:

```powershell
cd frontend
npm run build
```

Then create a Static Site on Render, connect your repo, and set:

- Build Command: `cd frontend && npm install && npm run build`
- Publish Directory: `frontend/dist`

### Step 5: Update render.yaml with Frontend URL

Once frontend is deployed on Render, update `render.yaml`:

```yaml
- key: FRONTEND_URL
  value: https://your-actual-frontend-url.onrender.com
```

Then redeploy backend.

---

## 🔍 Testing After Deployment

1. **Check Backend Health**

   ```
   curl https://your-backend-url.onrender.com/api/notes
   ```

   Should return JSON array (empty or with notes)

2. **Check Frontend**

   - Visit your frontend URL
   - Create a note
   - Verify it saves and appears in the list

3. **Check Browser Console**
   - No CORS errors
   - No 404 on API calls

---

## 🚨 Troubleshooting

### "CORS Error" on Frontend

- Check `FRONTEND_URL` matches your actual frontend domain
- Verify backend `NODE_ENV=production`
- Check network tab in DevTools

### "Cannot GET /"

- Verify `frontend/dist` exists and is built
- Check path in `server.js` is correct
- Look at Render logs: `tail -f render.log`

### "MongoDB Connection Error"

- Verify MongoDB URI is correct
- Check IP whitelist on MongoDB Atlas (add `0.0.0.0/0`)
- Verify credentials haven't expired

### "Rate Limit Errors"

- Upstash Redis credentials are correct
- Check Upstash dashboard for errors
- Rate limit is 10 requests per 20 seconds

---

## 📊 File Checklist

- ✅ `backend/src/server.js` - CORS & path fixed
- ✅ `frontend/src/utils/apiInstance.js` - URL fixed
- ✅ `render.yaml` - Created
- ✅ `backend/package.json` - No changes needed
- ✅ `frontend/package.json` - No changes needed
- ✅ `.gitignore` - Already covers .env

---

## 🎉 You're Ready to Deploy!

Push to GitHub and your app will be live on Render within minutes.

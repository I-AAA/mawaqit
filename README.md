# Mawaqit – Islamic Prayer Times App
## Complete Setup Guide

---

## WHAT YOU GET

A full Progressive Web App (PWA) that works like a native Android app:
- Accurate prayer times for any city worldwide (via Aladhan API)
- Custom alarms: set any number of minutes BEFORE each prayer
- Optional second alarm exactly at prayer time
- Per-prayer alarm control (enable/disable each individually)
- Global "arm all" toggle for all 5 prayers at once
- Countdown timer to next prayer
- Hijri date display
- Works offline after first load
- Multiple calculation methods (Umm Al-Qura, ISNA, MWL, etc.)

---

## OPTION 1 — GITHUB PAGES (Free, Easiest, Recommended)

### Step 1: Create a free GitHub account
Go to https://github.com and sign up.

### Step 2: Create a new repository
- Click the "+" icon → "New repository"
- Name it: `mawaqit` (or anything you like)
- Set it to **Public**
- Click "Create repository"

### Step 3: Upload the files
Upload these 3 files to the repository:
- index.html
- manifest.json
- sw.js

You can drag & drop them on the GitHub web interface.

### Step 4: Enable GitHub Pages
- Go to your repository → Settings → Pages
- Under "Source", select: **Deploy from a branch**
- Branch: **main** / folder: **/ (root)**
- Click Save

### Step 5: Your app URL
After ~2 minutes, your app is live at:
`https://YOUR_GITHUB_USERNAME.github.io/mawaqit/`

---

## OPTION 2 — LOCAL ON YOUR PHONE (Fastest Test)

### Using Android + Chrome directly
1. Copy all 3 files to a folder on your PC
2. Open a terminal and run:
   ```
   npx serve .
   ```
   (Requires Node.js – or use VS Code Live Server extension)
3. Note your PC's local IP (e.g. 192.168.1.5)
4. On your Android phone (same WiFi), open Chrome and go to:
   `http://192.168.1.5:3000`
5. Install as app (see install steps below)

---

## OPTION 3 — NETLIFY (Free, Drag & Drop)

1. Go to https://netlify.com → Sign up free
2. Drag your entire folder onto the Netlify dashboard
3. Netlify gives you a live URL instantly (e.g. https://your-app.netlify.app)
4. Open that URL on your phone

---

## INSTALLING ON YOUR ANDROID PHONE

Once the app is open in Chrome on Android:

1. Tap the **⋮ menu** (three dots, top right of Chrome)
2. Tap **"Add to Home screen"** or **"Install app"**
3. Tap **"Add"** or **"Install"**
4. The app now appears on your home screen like a native app!

---

## ENABLING ALARMS & NOTIFICATIONS

When you first open the app:
1. Chrome will ask: **"Allow notifications?"** → Tap **Allow**
   - This enables system-level notifications (shows even when phone is locked)
2. Set your city by tapping the location bar
3. Tap the 🔔 bell icon next to any prayer to set its alarm
4. OR go to Settings → toggle "Enable All Alarms"

### How Alarms Work:
- **In-app**: A banner appears at the top + a chime sound plays
- **System notification**: Shows on lock screen (requires notification permission)
- **Timing**: Set 0 = on exact prayer time, or 5/10/15/20/30/custom minutes before

---

## ADDING YOUR OWN APP ICON (Optional)

The manifest.json references icon-192.png and icon-512.png.
To add a real icon:
1. Create or download an Islamic moon/star icon (192×192 px and 512×512 px)
2. Name them `icon-192.png` and `icon-512.png`
3. Upload alongside the other files

Free icon tool: https://realfavicongenerator.net

---

## ADVANCED: WRAP AS NATIVE APK

If you want a real .apk file for Android:

### Using PWABuilder (Free, No Coding):
1. Go to https://www.pwabuilder.com
2. Enter your GitHub Pages URL
3. Click "Package for stores" → Android
4. Download the generated APK
5. Install on your phone (enable "Install from unknown sources" in Android settings)

### Using Bubblewrap (Developer tool):
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://YOUR_URL/manifest.json
bubblewrap build
```
This generates a signed APK you can sideload or publish to Google Play.

---

## TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Prayer times not loading | Check internet connection; API requires network |
| Alarms not sounding when screen is off | Grant notification permission; Android may restrict background alerts |
| GPS location not working | Tap "Allow" when Chrome asks for location |
| App not installing | Must be served over HTTPS (GitHub Pages/Netlify handle this) |
| Alarm sound too quiet | This uses the Web Audio API; volume follows your media volume |

---

## CALCULATION METHODS

Select in Settings based on your region:
- **Umm Al-Qura** – Saudi Arabia, Gulf countries (default)
- **ISNA** – North America
- **Muslim World League** – Europe, Far East
- **Egyptian General Authority** – Egypt, Africa, Syria
- **University of Karachi** – Pakistan, Bangladesh

---

## DATA & PRIVACY

- Prayer times: Fetched from https://aladhan.com (free, open API)
- Location search: Uses OpenStreetMap Nominatim (no account needed)
- All your settings (city, alarms) are stored **locally on your device only**
- No account, no login, no data sent to any server

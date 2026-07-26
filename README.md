# Saffron Dental & Aesthetic Clinic — Static Website

A clean, polished, single-page static website for **Saffron Dental & Aesthetic Clinic** in Sector 2, Faridabad.

## What's inside

```
.
├── index.html          # Main page (Hero, About, Services, Doctor, Reviews, Visit, Footer)
├── css/
│   └── styles.css      # All design tokens, layout, animations, responsive styles
├── js/
│   └── main.js         # Mobile menu, carousel, service tabs, scroll reveal, active nav
├── images/             # Clinic photos, doctor portrait, before/after results, logo
└── README.md           # This file
```

## No paid APIs used

- WhatsApp button uses a free `wa.me` link
- Google Maps uses a free iframe embed
- Google Fonts are free
- Google Reviews link is a normal Google URL

## How to edit

1. Open `index.html` in any text editor (VS Code, Notepad++, etc.)
2. Change text between HTML tags, e.g. phone number, timings, address
3. Replace images in the `images/` folder with your own (keep the same filenames, or update the `src="images/..."` paths in `index.html`)
4. Refresh your browser to see changes

## How to deploy

### 1. Push to GitHub

Create a new empty repository on GitHub, then run these commands inside this folder:

```bash
git init
git add .
git commit -m "Initial Saffron clinic website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **Add New Project**
3. Select your repository
4. Keep the default settings (Vercel auto-detects static HTML)
5. Click **Deploy**

Vercel will give you a live URL. Every time you push changes to GitHub, Vercel will automatically redeploy.

### 3. Custom domain (optional)

In your Vercel project → **Settings** → **Domains**, add your domain (e.g. `saffronclinic.in`) and follow the DNS instructions.

## Credits

Design & development for Dr. Shivangi Goyal, Saffron Dental & Aesthetic Clinic.

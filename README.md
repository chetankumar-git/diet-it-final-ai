# Diet-IT 🌶

**Your Smart Indian AI Diet Planner**

Diet-IT is a full-stack Next.js app that uses Claude AI to generate personalized 7-day Indian meal plans based on your health goals.

---

## Features

- 🤖 AI-generated 7-day Indian meal plans
- 🍱 Breakfast, Lunch, Snack & Dinner for each day
- 📖 Tap any meal to get the full recipe + nutrition info
- 👤 Profile page to personalize your plan
- 🎯 Quick tags: Weight Loss, High Protein, Diabetic Friendly, etc.
- 🎲 Surprise me button for random dish suggestions
- 📱 Mobile responsive

---

## Local Setup

### 1. Clone or download this project

```bash
cd diet-it
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your Anthropic API key

Create a `.env.local` file in the root folder:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get your API key from: https://console.anthropic.com

### 4. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Deploy to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "first commit"
```

Go to github.com → New repository → name it `diet-it` → create it.

Then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/diet-it.git
git branch -M main
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to https://vercel.com and sign in (use your GitHub account)
2. Click **"Add New Project"**
3. Import your `diet-it` GitHub repository
4. Under **"Environment Variables"**, add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your API key from console.anthropic.com
5. Click **Deploy**

That's it! Your app will be live at `https://diet-it.vercel.app` (or similar).

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude (claude-sonnet-4-20250514)
- **Fonts**: Bebas Neue + Barlow (Google Fonts)
- **Deployment**: Vercel

---

## Project Structure

```
diet-it/
├── src/
│   ├── app/
│   │   ├── page.js              # Home page
│   │   ├── plan/page.js         # 7-day meal plan page
│   │   ├── profile/page.js      # User profile page
│   │   ├── api/
│   │   │   ├── generate-plan/route.js   # Claude API - meal plan
│   │   │   └── get-recipe/route.js      # Claude API - recipe
│   │   ├── layout.js
│   │   └── globals.css
│   └── components/
│       └── Navbar.js
├── .env.example
├── .gitignore
├── next.config.js
├── tailwind.config.js
└── package.json
```

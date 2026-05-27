# Diet-IT 

**Your Smart Indian AI Diet Planner**

Diet-IT is a full-stack Next.js app that uses GROQ AI to generate personalized 7-day Indian meal plans based on your health goals.

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

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: groq api
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
│   │   │   ├── generate-plan/route.js   
│   │   │   └── get-recipe/route.js      
│   │   ├── layout.js
│   │   └── globals.css
│   └── components/
│       └── Navbar.js
├── .env.local
├── .gitignore
├── next.config.js
├── tailwind.config.js
└── package.json
```

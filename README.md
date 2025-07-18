# 🎰 Poker Night RSVP

A beautiful, animated poker night invitation website with RSVP functionality that stores responses in Google Sheets.

## ✨ Features

- **Beautiful UI** with poker-themed animations
- **RSVP Form** with game preferences
- **Google Sheets Integration** for storing responses
- **Privacy-First** - only you see real responses, others see sample data
- **Responsive Design** works on all devices
- **Modern Tech Stack** - Next.js, React, TypeScript, Tailwind CSS

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd poker-night-invite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Google Sheets** (see [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md))
   - Create a Google Sheet
   - Get API key from Google Cloud Console
   - Add environment variables to `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** to `http://localhost:3000`

## 🌐 Deploy to Vercel

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set environment variables** in Vercel dashboard:
   - `GOOGLE_SHEETS_API_KEY`
   - `GOOGLE_SPREADSHEET_ID`

### Option 2: Deploy via GitHub

1. **Push your code to GitHub**

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

## 🔧 Environment Variables

Create a `.env.local` file for local development:

```env
GOOGLE_SHEETS_API_KEY=your_api_key_here
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
```

**For Vercel deployment**, add these in your Vercel project settings.

## 📊 Google Sheets Setup

See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) for detailed instructions on setting up Google Sheets integration.

## 🎨 Customization

- **Colors**: Update Tailwind classes in components
- **Text**: Modify content in `src/app/page.tsx`
- **Games**: Add/remove games in the RSVP form
- **Animations**: Adjust Framer Motion settings

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Headless UI
- **Icons**: Lucide React
- **Data Storage**: Google Sheets API

## 📝 License

MIT License - feel free to use this for your own poker nights!

## 🎯 Support

If you need help setting up Google Sheets or deploying, check the setup documentation or open an issue.

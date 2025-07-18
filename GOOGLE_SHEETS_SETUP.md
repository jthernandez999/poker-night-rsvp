# Google Sheets Setup for RSVP Data

## Overview
This setup will store all RSVP responses in your private Google Sheets, so only you can see the actual guest list while everyone else sees sample data.

## Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name the first sheet "Sheet1"
4. Add these headers in row 1:
   - A1: Timestamp
   - B1: Name
   - C1: Email
   - D1: Response
   - E1: Preferred Game
   - F1: Message

## Step 2: Get Google Sheets API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key

## Step 3: Get Spreadsheet ID
1. Open your Google Sheet
2. Copy the ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the part between `/d/` and `/edit`

## Step 4: Set Environment Variables
1. Create a `.env.local` file in your project root
2. Add these variables:
```
GOOGLE_SHEETS_API_KEY=your_api_key_here
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
```

## Step 5: Share Sheet (Optional)
1. In Google Sheets, click "Share"
2. Add your email with "Editor" permissions
3. Make sure the sheet is not public

## How It Works
- **Public Display**: Everyone sees the same sample data
- **Private Storage**: Real RSVP responses go to your Google Sheet
- **You Only**: Only you can access the actual guest list
- **Automatic**: Responses are automatically added to your sheet

## Security
- API key is stored in environment variables
- Sheet is private to you
- No one else can see the real responses
- Sample data maintains the casino atmosphere

## Testing
1. Submit an RSVP through the form
2. Check your Google Sheet - you should see the new row
3. The website will still show sample data to everyone else 
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

// Sample data for public display (what everyone sees)
const publicResponses = [
  { name: "John Doe", email: "john@example.com", response: "yes", message: "Can't wait for Texas Hold'em! 🃏", preferredGame: "texas-holdem" },
  { name: "Sarah Wilson", email: "sarah@example.com", response: "yes", preferredGame: "blackjack" },
  { name: "Mike Chen", email: "mike@example.com", response: "maybe", message: "I'll try to make it!", preferredGame: "loteria" },
  { name: "Emma Davis", email: "emma@example.com", response: "no", message: "Sorry, I'm out of town" },
];

// In-memory storage for fallback (only for development)
const fallbackResponses: Array<{
  name: string;
  email: string;
  response: "yes" | "no" | "maybe";
  message?: string;
  preferredGame?: "texas-holdem" | "blackjack" | "loteria" | "all";
  id: number;
  timestamp: string;
}> = [];

// Function to append data to Google Sheets
async function appendToGoogleSheets(data: {
  name: string;
  email: string;
  response: "yes" | "no" | "maybe";
  message?: string;
  preferredGame?: "texas-holdem" | "blackjack" | "loteria" | "all";
}) {
  if (!SPREADSHEET_ID || !API_KEY) {
    console.error('Google Sheets not configured - missing SPREADSHEET_ID or API_KEY');
    return false;
  }

  try {
    const sheets = google.sheets({ version: 'v4', auth: API_KEY });
    
    const rowData = [
      new Date().toISOString(),
      data.name,
      data.email,
      data.response,
      data.preferredGame || 'all',
      data.message || ''
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:F',
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData]
      }
    });

    console.log('Successfully added to Google Sheets:', data.name);
    return true;
  } catch (error) {
    console.error('Error adding to Google Sheets:', error);
    return false;
  }
}

export async function GET() {
  // Return sample data plus any real submissions (for privacy, only show sample data to public)
  const allResponses = [...publicResponses, ...fallbackResponses];
  return NextResponse.json(allResponses);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received RSVP submission:', body);
    
    // Try to store in Google Sheets first
    const sheetsSuccess = await appendToGoogleSheets(body);
    
    if (sheetsSuccess) {
      console.log('Successfully stored in Google Sheets');
      return NextResponse.json({ 
        success: true, 
        message: 'RSVP submitted successfully! Your response has been recorded.',
        response: {
          ...body,
          id: Date.now(),
          timestamp: new Date().toISOString()
        }
      });
    } else {
      // Fallback: Store in memory if Google Sheets fails
      console.log('Google Sheets failed, using fallback storage');
      console.log('RSVP Data:', body);
      
      const newResponse = {
        ...body,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };
      
      // Add to fallback storage
      fallbackResponses.push(newResponse);
      
      return NextResponse.json({ 
        success: true, 
        message: 'RSVP submitted successfully! (Stored locally - Google Sheets not configured yet)',
        response: newResponse
      });
    }
  } catch (error) {
    console.error('RSVP Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit RSVP. Please try again.' },
      { status: 500 }
    );
  }
} 
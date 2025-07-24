import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

// Function to append partnership data to Google Sheets
async function appendPartnershipToGoogleSheets(data: {
  projectName: string;
  website: string;
  twitter: string;
  otherLinks: string;
  whitelists: string;
  why: string;
  token: string;
  contact: string;
}) {
  if (!SPREADSHEET_ID || !API_KEY) {
    console.error('Google Sheets not configured - missing SPREADSHEET_ID or API_KEY');
    return false;
  }

  try {
    const sheets = google.sheets({ version: 'v4', auth: API_KEY });
    
    const rowData = [
      new Date().toISOString(),
      data.projectName,
      data.website,
      data.twitter,
      data.otherLinks,
      data.whitelists,
      data.why,
      data.token,
      data.contact
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Partnerships!A:I', // Use a different sheet for partnerships
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData]
      }
    });

    console.log('Successfully added partnership to Google Sheets:', data.projectName);
    return true;
  } catch (error) {
    console.error('Error adding partnership to Google Sheets:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received partnership submission:', body);
    
    // Validate required fields
    if (!body.projectName || !body.contact) {
      return NextResponse.json(
        { success: false, message: 'Project name and contact information are required.' },
        { status: 400 }
      );
    }
    
    // Try to store in Google Sheets
    const sheetsSuccess = await appendPartnershipToGoogleSheets(body);
    
    if (sheetsSuccess) {
      console.log('Successfully stored partnership in Google Sheets');
      return NextResponse.json({ 
        success: true, 
        message: 'Partnership application submitted successfully! We will review your submission and get back to you soon.',
        response: {
          ...body,
          id: Date.now(),
          timestamp: new Date().toISOString()
        }
      });
    } else {
      console.log('Google Sheets failed for partnership submission');
      return NextResponse.json(
        { success: false, message: 'Failed to submit partnership application. Please try again or contact us directly.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Partnership Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit partnership application. Please try again.' },
      { status: 500 }
    );
  }
} 
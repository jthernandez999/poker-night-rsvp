import { NextResponse } from 'next/server';

// Type definition for RSVP responses
interface RSVPResponse {
  name: string;
  email: string;
  response: "yes" | "no" | "maybe";
  message?: string;
  preferredGame?: "texas-holdem" | "blackjack" | "loteria" | "all";
  id?: number;
  timestamp?: string;
}

export async function GET() {
  try {
    // Get the current responses from the main API
    const response = await fetch('http://localhost:3000/api/rsvp');
    const data = await response.json();
    
    // Filter out sample data and only include real submissions
    const realResponses = data.filter((item: RSVPResponse) => item.id && item.timestamp);
    
    if (realResponses.length === 0) {
      return NextResponse.json({ 
        message: 'No real RSVP submissions found',
        csv: ''
      });
    }
    
    // Create CSV header
    const csvHeader = 'Timestamp,Name,Email,Response,Preferred Game,Message\n';
    
    // Create CSV rows
    const csvRows = realResponses.map((item: RSVPResponse) => {
      return [
        item.timestamp || new Date().toISOString(),
        item.name,
        item.email,
        item.response,
        item.preferredGame || 'all',
        item.message || ''
      ].map(field => `"${field}"`).join(',');
    }).join('\n');
    
    const csvContent = csvHeader + csvRows;
    
    return NextResponse.json({ 
      message: `Found ${realResponses.length} RSVP submissions`,
      csv: csvContent,
      count: realResponses.length
    });
    
  } catch (error) {
    console.error('Error exporting RSVP data:', error);
    return NextResponse.json(
      { error: 'Failed to export RSVP data' },
      { status: 500 }
    );
  }
} 
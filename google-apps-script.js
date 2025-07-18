// Google Apps Script to handle RSVP submissions
// Deploy this as a web app to handle RSVP data

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.openById('1r5FsGsV378T_8Fvo6etC06jO9DHSmQ_OypaQjWxDRLE');
    const sheet = spreadsheet.getSheetByName('Sheet1');
    
    // Prepare the row data
    const rowData = [
      new Date().toISOString(),
      data.name,
      data.email,
      data.response,
      data.preferredGame || 'all',
      data.message || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'RSVP submitted successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error submitting RSVP: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (optional)
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'RSVP API is running'
    }))
    .setMimeType(ContentService.MimeType.JSON);
} 
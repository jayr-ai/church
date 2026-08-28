export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Your new Google Apps Script endpoint
    const APPS_SCRIPT_URL = 'https://script.googleapis.com/macros/s/AKfycbxjJ0cgojG0s5lM_Oh1nzOJAFenFTeAYRrUhV5WimIrEWbRDLXjIJKlMniOifgZsQ5h/exec';

    const response = await fetch(APPS_SCRIPT_URL);
    if (!response.ok) {
      throw new Error(`Apps Script error: ${response.statusText}`);
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

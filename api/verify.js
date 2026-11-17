export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  const num = req.query.num || '';

  if (!/^\+?[0-9]{8,15}$/.test(num)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid number'
    });
  }

  try {
    // Calling the external API endpoint with the validated number
    const apiResponse = await fetch(`https://darktoolshub.net/sms/call.php?num=${encodeURIComponent(num)}`);
    const resultText = await apiResponse.text();

    return res.status(200).json({
      success: true,
      message: 'API request successful',
      number: num,
      response: resultText,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to connect to external API',
      error: error.message
    });
  }
}

export default async function handler(req, res) {

  // CORS — যেকোনো origin থেকে call করা যাবে
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  // OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // শুধু GET accept করবে
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: '❌ Method Not Allowed'
    });
  }

  const num = (req.query.num || '').trim();

  // নম্বর ভ্যালিডেশন
  if (!num) {
    return res.status(400).json({
      success: false,
      message: '❌ Phone number missing'
    });
  }

  if (!/^\+?[0-9]{8,15}$/.test(num)) {
    return res.status(400).json({
      success: false,
      message: '❌ Invalid phone number format'
    });
  }

  try {
    const apiResponse = await fetch(
      `https://darktoolshub.net/sms/call.php?num=${encodeURIComponent(num)}`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );

    if (apiResponse.ok) {
      // সফল হলে
      return res.status(200).json({
        success: true,
        message: '✅ Request Send',
        number: num
      });
    } else {
      // বাইরের API ফেইল হলে
      return res.status(200).json({
        success: false,
        message: `❌ API Error (HTTP ${apiResponse.status})`,
        number: num
      });
    }

  } catch (error) {
    // যেকোনো এরর
    return res.status(200).json({
      success: false,
      message: `❌ Server Error: ${error.message}`,
      number: num
    });
  }
}

export default async function handler(req, res) {
  // শুধু GET accept করবে
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const num = req.query.num || '';

  // নম্বর ভ্যালিডেশন
  if (!/^\+?[0-9]{8,15}$/.test(num)) {
    return res.status(400).json({ success: false, message: 'Invalid number' });
  }

  try {
    const apiResponse = await fetch(
      `https://darktoolshub.net/sms/call.php?num=${encodeURIComponent(num)}`
    );

    if (apiResponse.ok) {
      // বাইরের API সফল হলে → Request Send
      return res.status(200).json({ success: true, message: 'Request Send', number: num });
    } else {
      // বাইরের API ফেইল হলে → Request Failed
      return res.status(400).json({ success: false, message: 'Request Failed', number: num });
    }
  } catch (error) {
    // নেটওয়ার্ক বা অন্য এরর → Request Failed
    return res.status(500).json({ success: false, message: 'Request Failed', error: error.message });
  }
}

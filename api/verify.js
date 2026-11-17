export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('fail');
  }

  const num = req.query.num || '';

  if (!/^\+?[0-9]{8,15}$/.test(num)) {
    return res.status(400).send('fail');
  }

  try {
    const apiResponse = await fetch(`https://darktoolshub.net/sms/call.php?num=${encodeURIComponent(num)}`);

    if (apiResponse.ok) {
      return res.status(200).send('success');
    } else {
      return res.status(400).send('fail');
    }
  } catch (error) {
    return res.status(500).send('fail');
  }
}

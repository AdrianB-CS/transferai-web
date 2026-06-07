export default async function handler(req, res) {
  const path = req.query.path || '';
  const params = new URLSearchParams(req.query);
  params.delete('path');
  
  const url = `https://prod.assistng.org/articulation/api/${path}${params.toString() ? '?' + params.toString() : ''}`;
  
  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

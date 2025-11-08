import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const SHEETDB_URL = "https://sheetdb.io/api/v1/z76rw4k00z4qo";

  try {
    const result = await fetch(SHEETDB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [req.body] })
    });

    if (!result.ok) {
      return res.status(500).json({ error: "SheetDB error" });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
}

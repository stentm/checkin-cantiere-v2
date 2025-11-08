import fetch from "node-fetch";

export const config = {
  runtime: "nodejs",   // forza runtime compatibile
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const SHEETDB_URL = "https://sheetdb.io/api/v1/z76rw4k00z4qo";

  try {
    const result = await fetch(SHEETDB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [req.body] }),
    });

    const data = await result.json();

    if (!result.ok) {
      return res.status(500).json({ error: "SheetDB error", data });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
}

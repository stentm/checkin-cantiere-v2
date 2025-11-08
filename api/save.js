export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("REQ BODY:", req.body);

  const SHEETDB_URL = "https://sheetdb.io/api/v1/z76rw4k00z4qo";

  try {
    const response = await fetch(SHEETDB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [req.body] }),
    });

    const data = await response.json();
    console.log("SHEETDB RESPONSE:", data);

    if (!response.ok) {
      return res.status(500).json({ error: "SheetDB error", data });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error("ERROR:", e);
    return res.status(500).json({ error: e.toString() });
  }
}

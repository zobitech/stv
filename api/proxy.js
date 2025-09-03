// api/proxy.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send("Missing url parameter");
  }

  try {
    const response = await fetch(url, {
      headers: {
        "Referer": "https://stylisheleg4nt.com",
        "Origin": "https://stylisheleg4nt.com",
      },
    });

    // copy content-type
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/vnd.apple.mpegurl");
    res.setHeader("Cache-Control", "no-cache");

    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
}

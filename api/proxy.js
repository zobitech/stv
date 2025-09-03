// api/proxy.js

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    res.status(400).send("Missing url parameter");
    return;
  }

  try {
    const response = await fetch(url, {
      headers: {
        "Referer": "https://stylisheleg4nt.com/",
        "Origin": "https://stylisheleg4nt.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "Upgrade-Insecure-Requests": "1"
      }
    });

    if (!response.ok) {
      res.status(response.status).send("Upstream error: " + response.statusText);
      return;
    }

    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/vnd.apple.mpegurl"
    );
    res.setHeader("Cache-Control", "no-cache");

    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
}

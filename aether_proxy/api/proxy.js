// api/proxy.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ error: "Missing path parameter" });
  }

  const targetUrl = `http://149.118.151.140:8080/api/air-quality${path}`;

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();

    // Allow cross-origin requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy failed" });
  }
}

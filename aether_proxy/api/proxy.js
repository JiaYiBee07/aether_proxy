export default async function handler(req, res) {
  // Allow all origins (frontend, localhost, GitHub Pages)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle browser preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const { path = [] } = req.query;
    const pathString = Array.isArray(path) ? path.join("/") : path;

    const queryString = req.url.includes("?")
      ? req.url.slice(req.url.indexOf("?"))
      : "";

    const backendUrl =
      "http://149.118.151.140:8080/api/air-quality/" +
      pathString +
      queryString;

    const response = await fetch(backendUrl);
    const data = await response.text();

    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy failed" });
  }
}

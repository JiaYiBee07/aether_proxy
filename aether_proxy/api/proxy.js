export default async function handler(req, res) {
  try {
    const { path = [] } = req.query;

    const pathString = Array.isArray(path) ? path.join("/") : path;

    const backendUrl =
      "http://149.118.151.140:8080/api/air-quality/" +
      pathString +
      (req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "");

    const response = await fetch(backendUrl);
    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy request failed" });
  }
}

export default async function handler(req, res) {
  try {
    const queryString = new URLSearchParams(req.query).toString();

    const backendUrl =
      "http://149.118.151.140:8080/api/air-quality/real-time/air-quality?" +
      queryString;

    const response = await fetch(backendUrl);
    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy failed" });
  }
}

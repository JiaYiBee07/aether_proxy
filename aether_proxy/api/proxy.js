export default async function handler(req, res) {
  const { path = "" } = req.query;

  const backendUrl = "http://149.118.151.140:8080/api/air-quality/" + path;

  try {
    const response = await fetch(backendUrl);
    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy request failed" });
  }
}

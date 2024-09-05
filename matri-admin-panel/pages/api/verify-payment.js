import { backendUrl } from "@/url";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await fetch(backendUrl + "/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

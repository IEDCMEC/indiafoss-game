import { supabaseClient } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { email, secret } = req.body;

    const expectedSecret = process.env.NEXT_PUBLIC_MAIL_SECRET;

    const decodedSecret = Buffer.from(secret, "base64").toString("ascii");

    if (decodedSecret !== expectedSecret) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { data, error } = await supabaseClient.from("emails").insert({
      email: email,
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

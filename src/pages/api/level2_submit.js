import { supabaseClient } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      body: { name, email, phoneNumber, flag },
    } = req;

    if (!name || !email || !flag) {
      return res.status(400).json({
        error: "Missing name or email or flag",
      });
    }

    const { data, error } = await supabaseClient
      .from("level2_players")
      .insert([
        {
          name,
          email,
          phone: phoneNumber,
          flag,
        },
      ]);

    return res.status(200).json({
        message: "Submission Successful",
    });
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
}

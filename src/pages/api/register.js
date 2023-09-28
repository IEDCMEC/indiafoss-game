import { supabaseClient } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      body: { name, email, phoneNumber },
    } = req;

    if (!name || !email || !phoneNumber) {
      return res.status(400).json({
        error: "Missing name, email, or phone number",
      });
    }

    const { data, error } = await supabaseClient
      .from("players")
      .insert([
        {
          name,
          email,
          phone_number: phoneNumber,
        },
      ])
      .select("name, email");

    if (error) {
      if (
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        return res.status(400).json({
          error: "Email/ Phone Number already exists",
        });
      }
    }

    return res.status(200).json({
      data,
    });
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
}

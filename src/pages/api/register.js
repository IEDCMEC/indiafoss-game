import { supabaseClient } from "@/utils/supabase";
import jwt from "jsonwebtoken"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const secret = process.env.SECRET

    const {
      body: { name, email, phoneNumber },
    } = req;

    const token = jwt.sign(email,secret)

    if (!name || !email ) {
      return res.status(400).json({
        error: "Missing name or email",
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
      .select("id, name, email");

    if (error) {
      if (
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        return res.status(200).json({
          isRegistered: true,
        });
      }
    }

    return res.status(200).json({
      data:data,
      token: token,
      isRegistered: false,
    });
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
}

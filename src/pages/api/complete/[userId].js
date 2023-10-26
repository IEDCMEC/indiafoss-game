import { supabaseClient } from "@/utils/supabase";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "GET") {

    const {userId} = req.query;

    console.log(userId);

    if (!userId) {
      return res.status(400).json({
        error: "Missing userId",
      });
    }

    const { data, error } = await supabaseClient
      .from("players")
      .select("id, name, email, score, time_taken")
      .eq("id", userId);

    return res.status(200).json(data);
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
}

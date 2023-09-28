import { supabaseClient } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabaseClient
      .from("questions")
      .select("id,title,hint,type,image");
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
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

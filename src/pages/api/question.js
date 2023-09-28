import { supabaseClient } from "@/utils/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.secret !== process.env.SECRET || !req.body.secret) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const { data, error } = await supabaseClient
      .from("questions")
      .insert([
        {
          title: req.body.title,
          hint: req.body.hint ? req.body.hint : "",
          type: req.body.type,
          image: req.body.image ? req.body.image : "",
          answer: req.body.answer,
          mark: req.body.mark,
        },
      ])
      .select("*");

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
